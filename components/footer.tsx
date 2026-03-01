import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent border border-accent">
                <span className=" text-sm font-bold text-white">M</span>
              </div>
              <span className=" text-xl font-bold text-foreground">
                Momen<span className="text-accent">Ku</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Platform undangan digital premium untuk momen istimewa Anda.
              Desain eksklusif, fitur lengkap, harga terjangkau.
            </p>
          </div>

          {/* Links - Layanan */}
          <div>
            <h4 className="mb-4  text-sm font-semibold text-foreground">
              Layanan
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/home/#template"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Undangan Pernikahan
                </Link>
              </li>
              <li>
                <Link
                  href="/home/#template"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Undangan Khitanan
                </Link>
              </li>
              <li>
                <Link
                  href="/home/#template"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Undangan Aqiqah
                </Link>
              </li>
              <li>
                <Link
                  href="/home/#template"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Undangan Ulang Tahun
                </Link>
              </li>
            </ul>
          </div>

          {/* Links - Perusahaan */}
          <div>
            <h4 className="mb-4  text-sm font-semibold text-foreground">
              Perusahaan
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="#harga"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Harga
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Program Reseller
                </Link>
              </li>
            </ul>
          </div>

          {/* Links - Bantuan */}
          <div>
            <h4 className="mb-4  text-sm font-semibold text-foreground">
              Bantuan
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Pusat Bantuan
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} MomenKu. Semua hak dilindungi.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              Instagram
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              TikTok
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              YouTube
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
