import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactBody {
  name: string;
  email: string;
  service: string;
  message: string;
}

const SERVICE_LABELS: Record<string, string> = {
  branding: "Branding & Packaging",
  marketing: "Digital Marketing",
  storytelling: "Storytelling",
  martech: "MarTech Solution",
};

export async function POST(req: NextRequest) {
  try {
    const body: ContactBody = await req.json();
    const { name, email, service, message } = body;

    // ── Validation ──
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ thông tin." },
        { status: 400 }
      );
    }

    // ── Tạo transporter ──
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const serviceLabel = SERVICE_LABELS[service] || service;

    // ── Email gửi đến Bờ Kinh (thông báo có khách mới) ──
    await transporter.sendMail({
      from: `"BỜ KINH Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVE_EMAIL,
      replyTo: email,
      subject: `Yêu cầu mới từ ${name} — ${serviceLabel}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #040d07; color: #fff; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1a7a3e, #163d21); padding: 32px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; color: #FBB824;">BỜ KINH</h1>
            <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">Yêu cầu liên hệ mới từ website</p>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; color: #FBB824; font-weight: 600; width: 140px; vertical-align: top;">Họ và Tên</td>
                <td style="padding: 12px 0; color: #fff;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #FBB824; font-weight: 600; vertical-align: top;">Email</td>
                <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #90cdf4;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #FBB824; font-weight: 600; vertical-align: top;">Dịch vụ</td>
                <td style="padding: 12px 0; color: #fff;">${serviceLabel}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #FBB824; font-weight: 600; vertical-align: top;">Lời nhắn</td>
                <td style="padding: 12px 0; color: rgba(255,255,255,0.85); line-height: 1.6;">${message.replace(/\n/g, "<br>")}</td>
              </tr>
            </table>
          </div>
          <div style="padding: 16px 32px; background: rgba(255,255,255,0.03); text-align: center; font-size: 12px; color: rgba(255,255,255,0.4);">
            Gửi từ bokinh.com • ${new Date().toLocaleDateString("vi-VN")}
          </div>
        </div>
      `,
    });

    // ── Email xác nhận gửi đến khách hàng ──
    await transporter.sendMail({
      from: `"BỜ KINH" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Cảm ơn ${name} — Bờ Kinh đã nhận yêu cầu của bạn!`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #040d07; color: #fff; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1a7a3e, #163d21); padding: 32px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; color: #FBB824;">BỜ KINH</h1>
            <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">Gìn giữ bản sắc, nâng tầm thương hiệu</p>
          </div>
          <div style="padding: 32px;">
            <p style="font-size: 18px; color: #FBB824; margin: 0 0 16px;">Xin chào ${name},</p>
            <p style="color: rgba(255,255,255,0.85); line-height: 1.8; margin: 0 0 24px;">
              Cảm ơn bạn đã quan tâm đến dịch vụ <strong style="color: #FBB824;">${serviceLabel}</strong> của Bờ Kinh.
              Chúng tôi đã nhận được lời nhắn của bạn và sẽ phản hồi trong thời gian sớm nhất.
            </p>
            <div style="background: rgba(255,255,255,0.05); border-left: 3px solid #FBB824; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 24px 0;">
              <p style="margin: 0; color: rgba(255,255,255,0.6); font-size: 13px;">Lời nhắn của bạn:</p>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); line-height: 1.6;">${message.replace(/\n/g, "<br>")}</p>
            </div>
            <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 24px 0 0;">
              Trân trọng,<br>
              <strong style="color: #fff;">Đội ngũ Bờ Kinh</strong>
            </p>
          </div>
          <div style="padding: 16px 32px; background: rgba(255,255,255,0.03); text-align: center; font-size: 12px; color: rgba(255,255,255,0.4);">
            © 2026 Bờ Kinh — Gìn giữ bản sắc, nâng tầm thương hiệu
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Email đã gửi thành công!" });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Không thể gửi email. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
