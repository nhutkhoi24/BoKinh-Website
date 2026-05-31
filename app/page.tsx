"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";

/* ── Scroll Reveal hook ── */
function useReveal() {
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    refs.current.forEach((el) => {
      if (el) {
        el.classList.add("reveal");
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  };
}

export default function HomePage() {
  const setRef = useReveal();

  return (
    <>
      <Header />

      <main>
        {/* ── 1. HERO SECTION ── */}
        <section className="hero-vip" id="home">
          <div className="hero-bg-vip">
            <Image
              className="fill-img"
              src="/image/pexels-muhammad-hary-2158336590-35313286.jpg"
              alt="Phong cảnh miền Tây"
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
            <div className="hero-overlay-vip"></div>
          </div>
          <div className="hero-content-vip">
            <div className="hero-main-row">
              <div className="hero-title-area">
                <span className="eyebrow-vip">Local Culture Branding</span>
                <h1 className="display-title-vip">BỜ KINH</h1>
                <h2
                  style={{ color: "aliceblue", fontSize: "1.5rem" }}>
                  Gìn giữ bản sắc, nâng tầm thương hiệu
                </h2>
              </div>
              <div className="hero-desc-area">
                <p>
                  BỜ KINH là startup branding và MarTech giúp SMEs địa phương
                  chuyển hóa giá trị văn hóa thành giá trị thương mại trong
                  thời đại số. Nâng tầm thương hiệu bản địa.
                </p>
              </div>
            </div>

            <div className="hero-bottom-bar">
              <div className="index-item">
                <span className="text">Branding &amp; Packaging</span>
              </div>
              <div className="index-item">
                <span className="text">Digital Marketing</span>
              </div>
              <div className="index-item">
                <span className="text">Local Storytelling</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. ABOUT PREVIEW ── */}
        <section className="about-preview" id="about" ref={setRef(0)}>
          <div className="container">
            <div className="editorial-layout">
              <div className="editorial-left">
                <span className="eyebrow" style={{ color: "var(--accent-gold)" }}>
                  Câu chuyện của chúng tôi
                </span>
                <h2 className="editorial-title">
                  Từ miền sông nước đến thị trường hiện đại.
                </h2>
                <div className="about-mascot-wrap">
                  <Image
                    src="/image/namvong.png"
                    alt="Mascot Nam Vồng"
                    className="about-mascot-img"
                    width={340}
                    height={400}
                    style={{ width: "75%", maxWidth: "340px", height: "auto" }}
                  />
                </div>
              </div>
              <div className="editorial-right">
                <p className="drop-cap">Có bao giờ mọi người tự hỏi:</p>

                <p>
                  Vì sao có những sản phẩm địa phương rất chất lượng, rất có
                  tâm, thậm chí mang đậm nét văn hóa riêng của vùng đất mình,
                  nhưng vẫn chưa thể đi xa hơn?
                </p>

                <p>
                  Có sản phẩm ngon, có người làm nghề giỏi, có câu chuyện rất
                  đẹp phía sau, nhưng khi bước ra thị trường hiện đại lại dần
                  bị &ldquo;lọt thỏm&rdquo; giữa hàng trăm thương hiệu khác.
                </p>

                <h3 className="sub-statement">
                  Không phải vì sản phẩm chưa tốt.
                </h3>

                <p>
                  Nhưng giữa thị trường hiện đại, nhiều doanh nghiệp địa phương
                  vẫn đang gặp khó khăn trong việc:
                </p>
                <ul className="elegant-list">
                  <li>Xây dựng thương hiệu</li>
                  <li>Phát triển hình ảnh sản phẩm</li>
                  <li>Tiếp cận khách hàng</li>
                  <li>Và mở rộng thị trường</li>
                </ul>

                <p>
                  Không ít sản phẩm có tiềm năng, nhưng lại chưa đủ khả năng
                  tạo niềm tin với khách hàng hoặc đối tác chỉ vì:
                </p>
                <ul className="elegant-list">
                  <li>Bao bì chưa đủ chuyên nghiệp</li>
                  <li>Hình ảnh chưa đủ thu hút</li>
                  <li>
                    Hoặc câu chuyện thương hiệu chưa được kể đúng cách
                  </li>
                </ul>

                <p className="the-finale">Đó cũng là lý do BỜ KINH ra đời.</p>
              </div>
            </div>
          </div>

          {/* Images grid */}
          <div className="about-images container mt-40">
            <div className="img-card card-tall">
              <Image
                src="/image/pexels-dang-vu-hai-683750211-33527084.jpg"
                className="fill-img"
                alt="Sông nước miền Tây"
                fill
                sizes="50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="img-card card-wide mt-20">
              <Image
                src="/image/pexels-ponvintage-30348747.jpg"
                className="fill-img"
                alt="Hình ảnh địa phương"
                fill
                sizes="50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </section>

        {/* ── 3. SERVICES PREVIEW ── */}
        <section className="services-preview" id="services" ref={setRef(1)}>
          <div className="container">
            <h2 className="section-title">Dịch vụ &amp; Giải pháp</h2>

            <div className="services-list mt-40">
              {[
                {
                  num: "01",
                  title: "Branding & Packaging",
                  desc: "Xây dựng nhận diện thương hiệu, logo, và thiết kế bao bì đậm chất văn hóa địa phương.",
                },
                {
                  num: "02",
                  title: "Digital Marketing",
                  desc: "Triển khai chiến dịch truyền thông đa nền tảng, đưa sản phẩm địa phương tiếp cận khách hàng số.",
                },
                {
                  num: "03",
                  title: "Local Storytelling",
                  desc: "Khai thác và kể câu chuyện thương hiệu đầy cảm xúc, chạm đến trái tim người tiêu dùng.",
                },
                {
                  num: "04",
                  title: "MarTech Solution",
                  desc: "Ứng dụng công nghệ tiếp thị, giải pháp e-commerce giúp SMEs quản lý và tăng trưởng doanh thu.",
                },
              ].map((service) => (
                <div className="service-row" key={service.num}>
                  <div className="service-num">{service.num}</div>
                  <div className="service-content">
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. FEATURED PROJECTS ── */}
        <section className="projects-section" id="projects" ref={setRef(2)}>
          <div className="container">
            <div className="flex-between align-end mb-40">
              <h2 className="section-title">Dự Án Nổi Bật</h2>
              <a href="#" className="btn btn-outline">
                Xem tất cả dự án
              </a>
            </div>

            <div className="projects-grid">
              <article className="project-card">
                <div className="project-img-wrapper">
                  <Image
                    src="/image/pexels-surya-travel-2068908189-37271679.jpg"
                    className="fill-img"
                    alt="Đặc Sản Miền Tây"
                    fill
                    sizes="50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="project-info">
                  <span className="project-category">
                    Branding &amp; Packaging
                  </span>
                  <h3 className="project-title">Đặc Sản Miền Tây</h3>
                </div>
              </article>

              <article className="project-card">
                <div className="project-img-wrapper">
                  <Image
                    src="/image/z7869360164401_ffd27be7c44cd464f219f31245a4c141.jpg"
                    className="fill-img"
                    alt="Local Coffee"
                    fill
                    sizes="50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="project-info">
                  <span className="project-category">Digital Marketing</span>
                  <h3 className="project-title">Local Coffee</h3>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ── 5. MASCOT SECTION ── */}
        <section className="mascot-section" ref={setRef(3)}>
          <div className="container mascot-layout">
            <div className="mascot-text">
              <span
                className="eyebrow"
                style={{ color: "var(--accent-gold)" }}
              >
                Linh vật thương hiệu
              </span>
              <h2 className="display-title small">
                Chào bạn,
                <br />
                mình là Út Nghé!
              </h2>
              <p className="body-large mt-20">
                Út Nghé là người bạn đồng hành của Bờ Kinh, mang đậm tính cách
                chân chất, hiếu khách của người miền Tây nhưng cũng rất hiện đại
                và nhạy bén với công nghệ.
              </p>
            </div>
            <div className="mascot-visual">
              <div className="mascot-bg-text">ÚT NGHÉ</div>
              <div className="mascot-blob">
                <Image
                  src="/image/moscot.png"
                  className="fill-img mascot-img"
                  alt="Út Nghé"
                  width={500}
                  height={500}
                  style={{ width: "85%", height: "85%", objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. FINAL CTA ── */}
        <section className="cta-parallax">
          <div className="cta-overlay"></div>
          <div className="container text-center">
            <span
              className="eyebrow"
              style={{ color: "var(--accent-gold)" }}
            >
              Tầm Nhìn
            </span>
            <h2 className="cta-quote">
              Bản sắc địa phương
              <br />
              <span className="gold-script">Tư duy thời đại.</span>
            </h2>
            <div className="mt-40">
              <a href="#contact" className="btn btn-glow">
                Bắt đầu dự án &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* ── 7. CONTACT / FOOTER ── */}
        <section className="contact-section" id="contact" ref={setRef(4)}>
          <div className="container contact-layout">
            {/* Left: Info */}
            <div className="contact-info">
              <h2 className="section-title">Kết nối với Bờ Kinh</h2>
              <p className="mt-20">
                Sẵn sàng đưa sản phẩm của bạn vươn xa? Hãy để lại lời nhắn,
                chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
              </p>

              <div className="social-links mt-40">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=bokinhforwork@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                >
                  <span className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>{" "}
                  Gmail
                </a>
                <a
                  href="https://facebook.com/bokinh.agency"
                  target="_blank"
                  className="social-btn"
                >
                  <span className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </span>{" "}
                  Facebook
                </a>
                <a
                  href="https://instagram.com/bokinh.studio"
                  target="_blank"
                  className="social-btn"
                >
                  <span className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line
                        x1="17.5"
                        y1="6.5"
                        x2="17.51"
                        y2="6.5"
                      ></line>
                    </svg>
                  </span>{" "}
                  Instagram
                </a>
              </div>
            </div>

            {/* Right: Form */}
            <div className="contact-form-wrapper">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer bg-green-dark text-center">
        <p>&copy; 2026 Bờ Kinh - Gìn giữ bản sắc, nâng tầm thương hiệu.</p>
      </footer>
    </>
  );
}
