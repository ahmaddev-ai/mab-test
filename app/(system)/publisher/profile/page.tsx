"use client";

import { useAuth } from "@/context/Auth";
import { db, uploadImageToFirebase } from "@/firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Camera, Loader2, Save, Shield, User } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const { user, role } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
  });

  /* ---------------- FETCH USER ---------------- */

  useEffect(() => {
    if (!user?.uid) return;

    const fetchUser = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const data = snap.data();

          setName(data.name || "");
          setPhotoURL(data.photoURL || "");

          setStats({
            totalBlogs: data.totalBlogs || 0,
            publishedBlogs: data.publishedBlogs || 0,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  /* ---------------- UPDATE PROFILE ---------------- */

  const updateProfile = async () => {
    if (!user?.uid) return;

    try {
      setSaving(true);

      await updateDoc(doc(db, "users", user.uid), {
        name,
        photoURL,
      });

      alert("Profile updated successfully ✅");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- IMAGE UPLOAD ---------------- */

  const handleImageUpload = async (file: File) => {
    try {
      const url = await uploadImageToFirebase(file);
      setPhotoURL(url);
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/50">
        <Loader2 className="animate-spin mr-3" />
        Loading profile...
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">Profile</h1>
        <p className="text-white/50">Manage your account information</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* ---------------- LEFT CARD ---------------- */}
        <div className="bg-[#0a0c12] border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border border-white/10">
              {photoURL ? (
                <Image
                  src={photoURL}
                  alt="avatar"
                  width={120}
                  height={120}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black/30">
                  <User size={40} className="text-white/40" />
                </div>
              )}
            </div>

            {/* Upload button */}
            <label className="absolute bottom-0 right-0 bg-emerald-500 text-black p-2 rounded-full cursor-pointer">
              <Camera size={14} />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) =>
                  e.target.files && handleImageUpload(e.target.files[0])
                }
              />
            </label>
          </div>

          <h3 className="mt-4 text-lg font-semibold text-white">{name}</h3>

          {/* Role */}
          <div className="flex items-center gap-2 mt-2 text-sm text-emerald-400">
            <Shield size={14} />
            {role}
          </div>

          {/* Stats */}
          <div className="w-full mt-6 space-y-3 text-sm">
            <div className="flex justify-between text-white/70">
              <span>Total Blogs</span>
              <span className="text-white">{stats.totalBlogs}</span>
            </div>

            <div className="flex justify-between text-white/70">
              <span>Published</span>
              <span className="text-white">{stats.publishedBlogs}</span>
            </div>
          </div>
        </div>

        {/* ---------------- RIGHT FORM ---------------- */}
        <div className="md:col-span-2 bg-[#0a0c12] border border-white/10 rounded-3xl p-8 space-y-6">
          <h2 className="text-xl font-semibold text-white">
            Account Information
          </h2>

          {/* Name */}
          <div>
            <label className="text-sm text-white/50">Full Name</label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-white/50">Email</label>

            <input
              value={user?.email || ""}
              disabled
              className="mt-2 w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white/50"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm text-white/50">Role</label>

            <input
              value={role || ""}
              disabled
              className="mt-2 w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white/50"
            />
          </div>

          {/* Save */}
          <button
            onClick={updateProfile}
            disabled={saving}
            className="flex items-center gap-2 bg-emerald-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-emerald-600 transition"
          >
            {saving ? <Loader2 className="animate-spin" /> : <Save size={16} />}
            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
}
