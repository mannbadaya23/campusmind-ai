import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    product: [
      { label: "Features", path: "/landing-page" },
      { label: "Dashboard", path: "/dashboard-overview" },
      { label: "Study Planner", path: "/study-planner" },
      { label: "AI Coach", path: "/landing-page" }
    ],
    company: [
      { label: "About Us", path: "/landing-page" },
      { label: "Careers", path: "/landing-page" },
      { label: "Blog", path: "/landing-page" },
      { label: "Press Kit", path: "/landing-page" }
    ],
    resources: [
      { label: "Help Center", path: "/landing-page" },
      { label: "Community", path: "/landing-page" },
      { label: "Guides", path: "/landing-page" },
      { label: "API Docs", path: "/landing-page" }
    ],
    legal: [
      { label: "Privacy Policy", path: "/landing-page" },
      { label: "Terms of Service", path: "/landing-page" },
      { label: "Cookie Policy", path: "/landing-page" },
      { label: "GDPR", path: "/landing-page" }
    ]
  };

  const socialLinks = [
    { icon: "Twitter", url: "#", label: "Twitter" },
    { icon: "Facebook", url: "#", label: "Facebook" },
    { icon: "Instagram", url: "#", label: "Instagram" },
    { icon: "Linkedin", url: "#", label: "LinkedIn" },
    { icon: "Youtube", url: "#", label: "YouTube" }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg">
                <Icon name="Brain" size={24} className="text-white" />
              </div>
              <span className="text-xl font-heading font-bold text-foreground">
                CampusMind AI
              </span>
            </div>

            <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-sm">
              Empowering college students to achieve academic excellence and maintain mental wellness through AI-powered insights and personalized coaching.
            </p>

            <div className="mt-6 space-y-2 text-sm md:text-base">
  <p className="font-semibold text-foreground">
    Contact & Team
  </p>

  <p className="text-muted-foreground">
    <span className="font-medium text-foreground">Founder & Designer:</span>{" "}
    Mann Badaya
  </p>

  <p className="text-muted-foreground">
    <span className="font-medium text-foreground">Co-Founder:</span>{" "}
    Amrit Sharma
  </p>

  <p className="text-muted-foreground flex items-center gap-2">
    <Icon name="Phone" size={16} className="text-primary" />
    <span>+91 6350200535</span>
  </p>
</div>

            

            <div className="flex items-center gap-3">
              {socialLinks?.map((social, index) => (
                <a
                  key={index}
                  href={social?.url}
                  aria-label={social?.label}
                  className="flex items-center justify-center w-10 h-10 bg-muted hover:bg-primary hover:text-white rounded-lg transition-smooth"
                >
                  <Icon name={social?.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks?.product?.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link?.path)}
                    className="text-sm md:text-base text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks?.company?.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link?.path)}
                    className="text-sm md:text-base text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks?.resources?.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link?.path)}
                    className="text-sm md:text-base text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks?.legal?.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link?.path)}
                    className="text-sm md:text-base text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {currentYear} CampusMind AI. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Shield" size={16} className="text-success" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Lock" size={16} className="text-success" />
                <span>GDPR Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;