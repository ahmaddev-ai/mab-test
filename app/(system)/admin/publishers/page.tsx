"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Loader2,
  Users,
  Pencil,
  Trash2,
  AlertTriangle,
  X,
} from "lucide-react";
import CreatePublisherModal from "@/components/system/CreatePublisher";
import CredentialsModal from "@/components/system/CredModel";
import EditPublisherModal from "@/components/system/EditPublisherModal";

import { db } from "@/firebase/config";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

interface Publisher {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: any;
}

export default function PublishersPage() {
  const [open, setOpen] = useState(false);
  const [credentials, setCredentials] = useState(null);

  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit
  const [editTarget, setEditTarget] = useState<Publisher | null>(null);

  // Delete
  const [deleteTarget, setDeleteTarget] = useState<Publisher | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  /* ── FETCH ── */

  const fetchPublishers = async () => {
    try {
      setLoading(true);

      const q = query(
        collection(db, "users"),
        where("role", "==", "publisher"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Publisher[];

      setPublishers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublishers();
  }, []);

  /* ── HANDLERS ── */

  const handleUpdated = (id: string, name: string) => {
    setPublishers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name } : p))
    );
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);

      setDeleteError("");

      const res = await fetch("/api/delete-user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: deleteTarget.id }),
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Delete failed");

      setPublishers((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err: any) {
      setDeleteError(err.message || "Something went wrong");
    } finally {
      setDeleting(false);
    }
  };

  /* ── UTIL ── */

  const formatDate = (ts: any) =>
    ts?.seconds ? new Date(ts.seconds * 1000).toLocaleDateString() : "-";

  /* ── UI ── */

  return (
    <section className="px-4 md:px-6 lg:px-8 py-6 max-w-7xl mx-auto mt-10">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
            Publishers
          </h1>
          <p className="text-black dark:text-white text-sm mt-1">
            Manage blog publishers
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center  gap-2 w-full sm:w-auto bg-emerald-500 text-black px-5 py-3 rounded-xl hover:bg-emerald-600 transition shadow-lg"
        >
          <Plus size={18} />
          Create Publisher
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex items-center justify-center py-20 text-black dark:text-white">
          <Loader2 className="animate-spin mr-3" />
          Loading publishers...
        </div>
      )}

      {/* EMPTY */}
      {!loading && publishers.length === 0 && (
        <div className="bg-[#0a0c12] border border-white/10 rounded-3xl p-12 text-center">
          <Users className="mx-auto mb-4 text-white/30" size={40} />
          <p className="text-black dark:text-white">
            No publishers created yet
          </p>
        </div>
      )}

      {/* ── MOBILE CARDS ── */}
      {!loading && publishers.length > 0 && (
        <>
          {" "}
          {/* ── MOBILE CARDS ── */}{" "}
          <div className="grid gap-4 sm:hidden">
            {" "}
            {publishers.map((publisher) => (
              <div
                key={publisher.id}
                className="bg-white dark:bg-[#0a0c12] border border-gray-200 dark:border-white/10 rounded-2xl p-5 space-y-3 shadow-sm dark:shadow-none"
              >
                {" "}
                <div>
                  {" "}
                  <p className="text-gray-500 dark:text-white/40 text-xs">
                    {" "}
                    Name{" "}
                  </p>{" "}
                  <p className="text-gray-900 dark:text-white font-medium">
                    {" "}
                    {publisher.name}{" "}
                  </p>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <p className="text-gray-500 dark:text-white/40 text-xs">
                    {" "}
                    Email{" "}
                  </p>{" "}
                  <p className="text-gray-700 dark:text-white/80 break-all">
                    {" "}
                    {publisher.email}{" "}
                  </p>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <p className="text-gray-500 dark:text-white/40 text-xs">
                    {" "}
                    Created{" "}
                  </p>{" "}
                  <p className="text-gray-600 dark:text-white/60 text-sm">
                    {" "}
                    {formatDate(publisher.createdAt)}{" "}
                  </p>{" "}
                </div>{" "}
                <div className="flex gap-2 pt-1">
                  {" "}
                  {/* Edit */}{" "}
                  <button
                    onClick={() => setEditTarget(publisher)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white/70 hover:bg-gray-200 dark:hover:bg-white/10 transition text-sm"
                  >
                    {" "}
                    <Pencil size={14} /> Edit{" "}
                  </button>{" "}
                  {/* Delete */}{" "}
                  <button
                    onClick={() => {
                      setDeleteTarget(publisher);
                      setDeleteError("");
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition text-sm"
                  >
                    {" "}
                    <Trash2 size={14} /> Delete{" "}
                  </button>{" "}
                </div>{" "}
              </div>
            ))}{" "}
          </div>{" "}
          {/* ── DESKTOP TABLE ── */}{" "}
          <div className="hidden sm:block bg-white dark:bg-[#0a0c12] border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm dark:shadow-none">
            {" "}
            <div className="overflow-x-auto">
              {" "}
              <table className="w-full text-left">
                {" "}
                <thead className="border-b border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/50 text-sm">
                  {" "}
                  <tr>
                    {" "}
                    <th className="p-5">Name</th> <th>Email</th>{" "}
                    <th>Created</th>{" "}
                    <th className="text-center pr-5">Actions</th>{" "}
                  </tr>{" "}
                </thead>{" "}
                <tbody>
                  {" "}
                  {publishers.map((publisher) => (
                    <tr
                      key={publisher.id}
                      className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition"
                    >
                      {" "}
                      <td className="p-5 font-medium text-gray-900 dark:text-white">
                        {" "}
                        {publisher.name}{" "}
                      </td>{" "}
                      <td className="text-gray-700 dark:text-white/70 break-all">
                        {" "}
                        {publisher.email}{" "}
                      </td>{" "}
                      <td className="text-gray-500 dark:text-white/50 text-sm">
                        {" "}
                        {formatDate(publisher.createdAt)}{" "}
                      </td>{" "}
                      <td className="pr-5">
                        {" "}
                        <div className="flex items-center justify-center gap-2">
                          {" "}
                          {/* Edit */}{" "}
                          <button
                            onClick={() => setEditTarget(publisher)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white/70 hover:bg-gray-200 dark:hover:bg-white/10 transition text-sm"
                          >
                            {" "}
                            <Pencil size={13} /> Edit{" "}
                          </button>{" "}
                          {/* Delete */}{" "}
                          <button
                            onClick={() => {
                              setDeleteTarget(publisher);
                              setDeleteError("");
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition text-sm"
                          >
                            {" "}
                            <Trash2 size={13} /> Delete{" "}
                          </button>{" "}
                        </div>{" "}
                      </td>{" "}
                    </tr>
                  ))}{" "}
                </tbody>{" "}
              </table>{" "}
            </div>{" "}
          </div>{" "}
        </>
      )}

      {/* ── CREATE MODAL ── */}
      <CreatePublisherModal
        open={open}
        onClose={() => setOpen(false)}
        onCreated={(data: any) => {
          setCredentials(data);
          fetchPublishers();
        }}
      />

      <CredentialsModal
        data={credentials}
        onClose={() => setCredentials(null)}
      />

      {/* ── EDIT MODAL ── */}
      <EditPublisherModal
        publisher={editTarget}
        onClose={() => setEditTarget(null)}
        onUpdated={handleUpdated}
      />

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            onClick={() => !deleting && setDeleteTarget(null)}
            className="absolute inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="relative w-full max-w-sm bg-white dark:bg-[#0a0c12] border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
            <button
              onClick={() => setDeleteTarget(null)}
              disabled={deleting}
              className="absolute top-5 right-5 text-gray-400 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition disabled:opacity-50"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col items-center text-center gap-4">
              {/* Warning Icon */}
              <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
                <AlertTriangle
                  size={22}
                  className="text-red-600 dark:text-red-400"
                />
              </div>

              <div>
                <h2 className="text-gray-900 dark:text-white font-semibold text-lg">
                  Delete Publisher
                </h2>

                <p className="text-gray-500 dark:text-white/50 text-sm mt-1">
                  Are you sure you want to delete{" "}
                  <span className="text-gray-900 dark:text-white font-medium">
                    {deleteTarget.name}
                  </span>
                  ? This will permanently remove their account and cannot be
                  undone.
                </p>
              </div>

              {/* Error */}
              {deleteError && (
                <p className="text-red-600 dark:text-red-400 text-sm w-full text-left">
                  {deleteError}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleting}
                  className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {deleting && <Loader2 size={16} className="animate-spin" />}

                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
