"use client";

import { useState, FormEvent } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const body = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Có lỗi xảy ra");
      }

      setStatus("success");
      form.reset();

      // Reset về idle sau 5 giây
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Không thể gửi email. Vui lòng thử lại."
      );
    }
  };

  return (
    <form className="clean-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="contact-name">Họ và Tên</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          placeholder="Nhập tên của bạn"
          required
          disabled={status === "sending"}
        />
      </div>
      <div className="form-group">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          placeholder="Nhập địa chỉ email"
          required
          disabled={status === "sending"}
        />
      </div>
      <div className="form-group">
        <label htmlFor="contact-service">Dịch vụ quan tâm</label>
        <select
          id="contact-service"
          name="service"
          required
          disabled={status === "sending"}
        >
          <option value="">Chọn dịch vụ...</option>
          <option value="branding">Branding &amp; Packaging</option>
          <option value="marketing">Digital Marketing</option>
          <option value="storytelling">Storytelling</option>
          <option value="martech">MarTech Solution</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="contact-message">Lời nhắn</label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Chia sẻ thêm về dự án của bạn..."
          required
          disabled={status === "sending"}
        ></textarea>
      </div>

      {/* Status Messages */}
      {status === "success" && (
        <div className="form-status form-status-success">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>Gửi thành công! Chúng tôi sẽ liên hệ bạn sớm nhất.</span>
        </div>
      )}

      {status === "error" && (
        <div className="form-status form-status-error">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary full-width mt-10"
        disabled={status === "sending"}
      >
        {status === "sending" ? (
          <>
            <span className="spinner"></span>
            Đang gửi...
          </>
        ) : (
          "Gửi Yêu Cầu"
        )}
      </button>
    </form>
  );
}
