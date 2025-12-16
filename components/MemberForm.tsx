"use client";

import { useState, useRef } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { MEMBER_ROLES } from "@/lib/validation";

interface Props {
  artistId: string;
  onSuccess?: () => void;
  onClose?: () => void;
}

export default function MemberForm({ artistId, onSuccess, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!turnstileToken) {
      setError("Please complete the CAPTCHA");
      return;
    }

    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      role: formData.get("role"),
      isActive: formData.get("isActive") === "on",
      startYear: formData.get("startYear") ? parseInt(formData.get("startYear") as string) : null,
      endYear: formData.get("endYear") ? parseInt(formData.get("endYear") as string) : null,
      imageUrl: formData.get("imageUrl") || null,
      wikipediaUrl: formData.get("wikipediaUrl") || null,
      note: formData.get("note") || null,
      honeypot: formData.get("website"), // Honeypot field
      turnstileToken,
    };

    try {
      const res = await fetch(`/api/artists/${artistId}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Submission failed");
      }

      setSuccess(true);
      form.reset();
      setTurnstileToken(null);
      turnstileRef.current?.reset();
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-6 text-center">
        <div className="text-4xl mb-4 text-[#ba326b]">✓</div>
        <h3 className="text-xl font-semibold mb-2 text-[#4c222a]">Thank you!</h3>
        <p className="text-[#4c222a]/60 mb-4">Your submission is pending review.</p>
        <button
          onClick={() => {
            setSuccess(false);
            onClose?.();
          }}
          className="px-6 py-2.5 bg-[#610553] text-[#fdf5d4] rounded-full hover:bg-[#4a0440] cursor-pointer"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Honeypot - hidden from users */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div>
        <label className="block text-sm font-medium mb-1 text-[#4c222a]">Name *</label>
        <input
          type="text"
          name="name"
          required
          className="w-full px-3 py-2 border border-[#ba326b]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ba326b]/50 text-[#4c222a]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#4c222a]">Role *</label>
        <select
          name="role"
          required
          className="w-full px-3 py-2 border border-[#ba326b]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ba326b]/50 text-[#4c222a]"
        >
          <option value="">Select a role</option>
          {MEMBER_ROLES.map((role) => (
            <option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          id="isActive"
          defaultChecked
          className="rounded border-[#ba326b]/30 text-[#ba326b] focus:ring-[#ba326b]"
        />
        <label htmlFor="isActive" className="text-sm text-[#4c222a]">Currently active member</label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-[#4c222a]">Start Year</label>
          <input
            type="number"
            name="startYear"
            min="1900"
            max={new Date().getFullYear()}
            className="w-full px-3 py-2 border border-[#ba326b]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ba326b]/50 text-[#4c222a]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-[#4c222a]">End Year</label>
          <input
            type="number"
            name="endYear"
            min="1900"
            max={new Date().getFullYear()}
            className="w-full px-3 py-2 border border-[#ba326b]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ba326b]/50 text-[#4c222a]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#4c222a]">Image URL</label>
        <input
          type="url"
          name="imageUrl"
          placeholder="https://..."
          className="w-full px-3 py-2 border border-[#ba326b]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ba326b]/50 text-[#4c222a] placeholder:text-[#4c222a]/40"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#4c222a]">Wikipedia URL</label>
        <input
          type="url"
          name="wikipediaUrl"
          placeholder="https://en.wikipedia.org/wiki/..."
          className="w-full px-3 py-2 border border-[#ba326b]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ba326b]/50 text-[#4c222a] placeholder:text-[#4c222a]/40"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#4c222a]">Notes</label>
        <textarea
          name="note"
          rows={2}
          placeholder="Any additional information..."
          className="w-full px-3 py-2 border border-[#ba326b]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ba326b]/50 text-[#4c222a] placeholder:text-[#4c222a]/40 resize-none"
        />
      </div>

      {/* Cloudflare Turnstile CAPTCHA */}
      <div className="flex justify-center">
        <Turnstile
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={setTurnstileToken}
          onError={() => setError("CAPTCHA failed. Please try again.")}
          onExpire={() => setTurnstileToken(null)}
        />
      </div>

      <div className="flex gap-3 pt-2">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-[#fdf5d4] text-[#610553] rounded-full hover:bg-[#f5ebb8] cursor-pointer"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-2.5 bg-[#610553] text-[#fdf5d4] rounded-full hover:bg-[#4a0440] disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
