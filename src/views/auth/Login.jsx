import React, { useState } from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Verified Documents",
    description: "Cum Sociis Natoque Penatibus Et Magnis Dis",
    icon: "document",
    iconClass: "blue",
  },
  {
    title: "Legal Assistance",
    description: "Cum Sociis Natoque Penatibus Et Magnis Dis",
    icon: "legal",
    iconClass: "purple",
  },
  {
    title: "DTCP Approved",
    description: "Cum Sociis Natoque Penatibus Et Magnis Dis",
    icon: "approved",
    iconClass: "cyan",
  },
  {
    title: "Site Visit Support",
    description: "Cum Sociis Natoque Penatibus Et Magnis Dis",
    icon: "visit",
    iconClass: "orange",
  },
];

function FeatureIcon({ type }) {
  if (type === "document") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <rect
          x="5"
          y="3"
          width="14"
          height="18"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M8 8h5M8 11h8M8 14h5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <circle
          cx="16"
          cy="16"
          r="3"
          fill="white"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="m15 16 1 1 1.8-2"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "legal") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <path
          d="M12 5v14M8 19h8M6 8h12"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="m6 8-3 5a3 3 0 0 0 6 0L6 8ZM18 8l-3 5a3 3 0 0 0 6 0l-3-5Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
      </svg>
    );
  }

  if (type === "approved") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <circle cx="12" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="m9 11.5 2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 17.5 7 21l5-2 5 2-1-3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <path
        d="M5 18V7.5A2.5 2.5 0 0 1 7.5 5H16a2 2 0 0 1 2 2v7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M5 18h14M8 18v2M16 18v2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="m13 10 2-2 2 2M15 8v5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EyeIcon({ visible }) {
  return visible ? (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M2.5 12s3.5-5.5 9.5-5.5 9.5 5.5 9.5 5.5-3.5 5.5-9.5 5.5S2.5 12 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M3 3l18 18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M10.6 6.7A10.4 10.4 0 0 1 12 6.5c6 0 9.5 5.5 9.5 5.5a17 17 0 0 1-3.1 3.5M6.1 6.9C3.8 8.5 2.5 12 2.5 12s3.5 5.5 9.5 5.5c.8 0 1.5-.1 2.2-.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MuthVivesLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-14 w-12 items-center justify-center">
        <svg viewBox="0 0 48 55" fill="none" className="h-14 w-12">
          <path
            d="M24 3 7 18v16l17 14 17-14V18L24 3Z"
            stroke="#165BEF"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="m15 18 9 8 9-8M15 27l9 8 9-8M24 10v16"
            stroke="#165BEF"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div>
        <div className="text-[22px] font-bold leading-none text-gray-900">
          MuthVive’s
        </div>
        <div className="mt-1 text-[10px] font-semibold tracking-[4px] text-gray-500">
          PROPERTIES
        </div>
      </div>
    </div>
  );
}

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login submitted");
  };

  return (
    <main className="flex h-[100%] w-full flex-col bg-white lg:flex-row ">
      <section
        className="relative flex min-h-[650px] w-full items-center overflow-hidden bg-cover bg-center lg:min-h-[100%] lg:w-[55%]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-5xl px-8 py-16 lg:px-14 xl:px-20">
          <h1 className="max-w-2xl text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl xl:text-[56px]">
            Find A Place You’ll Love
            <br />
            To Call Home
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
            Discover verified properties that match your lifestyle, budget,
            <br className="hidden sm:block" />
            and location. Buy, sell, or rent your perfect property with
            <br className="hidden sm:block" />
            confidence.
          </p>

          {/* Features Grid */}
          <div className="mt-12 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex min-h-[105px] items-center gap-4 rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-md"
              >
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${
                    feature.iconClass === "blue"
                      ? "bg-blue-50 text-blue-600"
                      : feature.iconClass === "purple"
                        ? "bg-purple-50 text-purple-600"
                        : feature.iconClass === "cyan"
                          ? "bg-cyan-50 text-cyan-600"
                          : "bg-orange-50 text-orange-500"
                  }`}
                >
                  <FeatureIcon type={feature.icon} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-white/65">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RIGHT SIDE - Login Form */}
      <section className="flex min-h-screen w-full items-center justify-center bg-white px-6 py-12 lg:w-[45%] lg:px-12 xl:px-20">
        <div className="w-full max-w-[480px]">
          {/* Logo */}
          <MuthVivesLogo />

          {/* Heading */}
          <h2 className="mt-12 text-4xl font-bold tracking-tight text-gray-900">
            Login
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Highlight the best of your properties by using the List
            <br className="hidden sm:block" />
            Category shortcode. You can list categories
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-9">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="h-12 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Password */}
            <div className="mt-6">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  autoComplete="current-password"
                  required
                  className="h-12 w-full rounded-lg border border-gray-200 bg-white px-4 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 transition hover:text-gray-700"
                >
                  <EyeIcon visible={showPassword} />
                </button>
              </div>

              {/* Forgot Password */}
              <div className="mt-3 text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
                >
                  Forgot Password ?
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="mt-7 h-12 w-full rounded-lg bg-[#165BEF] text-sm font-semibold text-white shadow-sm transition hover:bg-[#0f4ed8] hover:shadow-md active:scale-[0.99]"
            >
              Login
            </button>
          </form>

          {/* Signup */}
          <p className="mt-7 text-center text-sm text-gray-500">
            You don’t have Account ?{" "}
            <Link
              to="/signup"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
