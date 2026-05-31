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
  <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F7F2E8; color: #173326; border-radius: 18px; overflow: hidden; border: 1px solid #E6D8BF;">
    
   <div style="background: linear-gradient(135deg, #0F3D2E, #1F6B45); padding: 34px 28px; text-align: center;">
  <h1 style="margin: 0; font-size: 30px; letter-spacing: 1px; color: #F4C45F;">
    BỜ KINH
  </h1>
  <p style="margin: 10px 0 0; color: #FFF3D6; font-size: 14px;">
    Gìn giữ bản sắc, nâng tầm thương hiệu
  </p>
</div>

    <div style="padding: 34px 30px; background: #FFFDF7;">
      <p style="font-size: 18px; color: #0F3D2E; margin: 0 0 16px; font-weight: 700;">
        Xin chào ${name},
      </p>

      <p style="color: #31483A; line-height: 1.8; margin: 0 0 24px; font-size: 15px;">
        Cảm ơn bạn đã quan tâm đến dịch vụ 
        <strong style="color: #B87912;">${serviceLabel}</strong> của Bờ Kinh.
        Chúng tôi đã nhận được lời nhắn của bạn và sẽ phản hồi trong thời gian sớm nhất.
      </p>

      <div style="background: #F2E7D2; border-left: 4px solid #D99A1E; padding: 18px 20px; border-radius: 0 12px 12px 0; margin: 26px 0;">
        <p style="margin: 0; color: #6D5B35; font-size: 13px; font-weight: 600;">
          Lời nhắn của bạn:
        </p>
        <p style="margin: 10px 0 0; color: #173326; line-height: 1.7; font-size: 15px;">
          ${message.replace(/\n/g, "<br>")}
        </p>
      </div>

      <p style="color: #5F6F65; font-size: 14px; margin: 26px 0 0; line-height: 1.7;">
        Trân trọng,<br>
        <strong style="color: #0F3D2E;">Đội ngũ Bờ Kinh</strong>
      </p>
    </div>

    <div style="padding: 18px 30px; background: #0F3D2E; text-align: center; font-size: 12px; color: #FFF3D6;">
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
