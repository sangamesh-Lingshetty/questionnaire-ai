"use client";

import React, { useState } from "react";
import {
  Check,
  ArrowRight,
  Clock,
  Star,
  Zap,
  DollarSign,
  AlertCircle,
  X,
} from "lucide-react";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [waitlistCount] = useState(73);

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) return;

    setLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg"></div>
          <span className="text-xl font-bold text-gray-900">
            QuestionnaireAI
          </span>
        </div>
        <button className="text-gray-600 hover:text-gray-900 font-medium transition">
          Sign in
        </button>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-blue-100">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            {waitlistCount} people joined this week
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Fill security questionnaires in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              30 minutes
            </span>
            , not 8 hours
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop wasting hours searching through documents. AI reads your
            security docs and auto-fills questionnaires instantly.
          </p>

          {!submitted ? (
            <div className="max-w-md mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                  className="flex-1 px-6 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!email || !email.includes("@") || loading}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Joining..." : "Join Waitlist"}
                  {!loading && <ArrowRight className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                🎁 Early access + 50% lifetime discount for waitlist members
              </p>
            </div>
          ) : (
            <div className="max-w-md mx-auto mb-8 bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                You are on the list!
              </h3>
              <p className="text-gray-600 mb-4">
                Check your email for next steps. We will notify you when we
                launch.
              </p>
              <div className="text-sm text-green-700 font-medium">
                ✓ Confirmation sent to {email}
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Free to join</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Launch in 3 weeks</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>No credit card needed</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="container mx-auto px-4 py-20 bg-red-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <AlertCircle className="w-4 h-4" />
              The Current Reality
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              The painful truth about security questionnaires
            </h2>
            <p className="text-xl text-gray-600">
              Your team is drowning in repetitive work that kills productivity
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              {
                icon: <Clock className="w-8 h-8" />,
                title: "4-8 hours wasted per questionnaire",
                desc: "Security teams manually search through 10+ documents, copy-pasting the same answers over and over",
                stat: "40+ hours/month",
              },
              {
                icon: <DollarSign className="w-8 h-8" />,
                title: "$22,500 monthly cost",
                desc: "At $75/hour analyst rate processing 20 questionnaires per month - pure waste on repetitive work",
                stat: "$270K/year",
              },
              {
                icon: <AlertCircle className="w-8 h-8" />,
                title: "Inconsistent answers hurt credibility",
                desc: "Different team members give different answers to the same questions across questionnaires",
                stat: "30% error rate",
              },
              {
                icon: <X className="w-8 h-8" />,
                title: "Missed deals from slow responses",
                desc: "Taking weeks to respond loses opportunities. Prospects expect answers in days, not weeks",
                stat: "2-3 weeks delay",
              },
            ].map((problem, i) => (
              <div
                key={i}
                className="bg-white border-2 border-red-200 p-6 rounded-2xl hover:shadow-lg transition"
              >
                <div className="text-red-600 mb-4">{problem.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {problem.title}
                </h3>
                <p className="text-gray-600 mb-4">{problem.desc}</p>
                <div className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {problem.stat}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border-2 border-red-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              The typical nightmare workflow:
            </h3>
            <div className="space-y-3 max-w-2xl mx-auto">
              {[
                "Receive questionnaire with 50-200 questions via email",
                "Hunt through 10+ documents (SOC 2 report, security policies, privacy policy, etc)",
                "Manually copy-paste answers from old questionnaires",
                "Search company wiki and Slack for missing information",
                "Ping 5 different team members for specific answers",
                "Spend hours formatting and reviewing for consistency",
                "Still miss questions and make mistakes under time pressure",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              Our Solution
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How QuestionnaireAI solves this
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stop the manual grind. Let AI do the heavy lifting in minutes, not
              hours.
            </p>
          </div>

          <div className="space-y-12 mb-16">
            {[
              {
                num: "01",
                title: "Upload your security documents",
                desc: "Drop in your SOC 2 report, security policies, privacy policy, compliance docs - any format (PDF, Word, Excel). One-time setup.",
                icon: "📄",
                time: "5 minutes",
              },
              {
                num: "02",
                title: "Upload the questionnaire",
                desc: "Receive a vendor questionnaire? Just upload it. We support Excel, PDF, Word, Google Forms - any format.",
                icon: "📝",
                time: "1 minute",
              },
              {
                num: "03",
                title: "AI fills it automatically",
                desc: "Our AI reads through all your documents, understands the context, and fills accurate answers based on your actual policies and procedures.",
                icon: "🤖",
                time: "20-30 minutes",
              },
              {
                num: "04",
                title: "Review and export",
                desc: "Quick 30-second review. Edit any answer if needed. Download in the original format and send it off. Done.",
                icon: "✅",
                time: "5 minutes",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="flex flex-col md:flex-row gap-6 items-start bg-white rounded-2xl p-8 shadow-sm border-2 border-blue-100"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {step.num}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-lg mb-3">{step.desc}</p>
                  <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    <Clock className="w-4 h-4" />
                    {step.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-12 text-center text-white shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Total time: 30-40 minutes instead of 8 hours
            </h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { stat: "91%", label: "Less time spent" },
                { stat: "95%+", label: "Accuracy rate" },
                { stat: "$590", label: "Saved per questionnaire" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20"
                >
                  <div className="text-5xl font-bold mb-2">{item.stat}</div>
                  <div className="text-blue-100">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="container mx-auto px-4 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How we compare to alternatives
            </h2>
            <p className="text-xl text-gray-600">
              90% cheaper and 10x faster than enterprise tools
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl overflow-hidden shadow-xl">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-5 text-left text-gray-900 font-bold text-lg">
                    Feature
                  </th>
                  <th className="px-6 py-5 text-center bg-blue-50 text-blue-900 font-bold text-lg border-x-4 border-blue-500">
                    <div className="flex items-center justify-center gap-2">
                      QuestionnaireAI
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        Best Value
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-5 text-center text-gray-700 font-semibold">
                    Whistic
                  </th>
                  <th className="px-6 py-5 text-center text-gray-700 font-semibold">
                    Panorays
                  </th>
                  <th className="px-6 py-5 text-center text-gray-700 font-semibold">
                    Manual Process
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  {
                    feature: "Monthly Price",
                    us: "$49/mo",
                    whistic: "$2,000-6,000/mo",
                    panorays: "$1,500-5,000/mo",
                    manual: "$800 per questionnaire",
                  },
                  {
                    feature: "Time per Questionnaire",
                    us: "30 minutes",
                    whistic: "2 hours",
                    panorays: "2 hours",
                    manual: "8 hours",
                  },
                  {
                    feature: "Setup Time",
                    us: "5 minutes",
                    whistic: "2-4 weeks",
                    panorays: "2-3 weeks",
                    manual: "Immediate",
                  },
                  {
                    feature: "AI-Powered Auto-fill",
                    us: "✅ Yes",
                    whistic: "⚠️ Limited",
                    panorays: "❌ No",
                    manual: "❌ No",
                  },
                  {
                    feature: "Learning Curve",
                    us: "✅ None",
                    whistic: "⚠️ High",
                    panorays: "⚠️ Medium",
                    manual: "✅ None",
                  },
                  {
                    feature: "Contract Required",
                    us: "✅ No (month-to-month)",
                    whistic: "❌ Yes (annual)",
                    panorays: "❌ Yes (annual)",
                    manual: "✅ No",
                  },
                  {
                    feature: "Support",
                    us: "✅ Priority email",
                    whistic: "⚠️ Enterprise only",
                    panorays: "⚠️ Email",
                    manual: "❌ None",
                  },
                  {
                    feature: "Best For",
                    us: "Small-medium teams",
                    whistic: "Large enterprises",
                    panorays: "Risk assessment",
                    manual: "Single questionnaires",
                  },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-5 text-gray-900 font-medium">
                      {row.feature}
                    </td>
                    <td className="px-6 py-5 text-center bg-blue-50/50 text-blue-900 font-semibold border-x-4 border-blue-500">
                      {row.us}
                    </td>
                    <td className="px-6 py-5 text-center text-gray-700">
                      {row.whistic}
                    </td>
                    <td className="px-6 py-5 text-center text-gray-700">
                      {row.panorays}
                    </td>
                    <td className="px-6 py-5 text-center text-gray-700">
                      {row.manual}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                90% Cheaper
              </h3>
              <p className="text-gray-600">
                Save $20,000+ per year vs enterprise tools
              </p>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                16x Faster
              </h3>
              <p className="text-gray-600">30 minutes vs 8 hours manual work</p>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Zero Setup
              </h3>
              <p className="text-gray-600">
                Start in 5 minutes vs weeks of onboarding
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
            See it in action
          </h2>
          <p className="text-gray-600 text-center mb-12 text-xl">
            Watch how QuestionnaireAI fills a 100-question security
            questionnaire in 60 seconds
          </p>

          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
            <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer hover:scale-110 transition shadow-2xl">
                  <svg
                    className="w-12 h-12 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
                <p className="text-gray-700 font-semibold text-lg mb-2">
                  Watch demo video
                </p>
                <p className="text-gray-500">
                  60-second product walkthrough (Coming soon)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-4 py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            What security teams are saying
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "This would literally save us 10+ hours every single week. Our team fills 5-10 questionnaires monthly and it's killing our productivity. Can't wait for this!",
                author: "Sarah Martinez",
                role: "Security Manager",
                company: "SaaS Startup",
              },
              {
                quote:
                  "Finally! Been looking for this exact solution for 2 years. Enterprise tools are way too expensive and complex for our 20-person team. This is perfect.",
                author: "Michael Chen",
                role: "Compliance Director",
                company: "Tech Company",
              },
              {
                quote:
                  "The ROI is a no-brainer. We spend $2,500/month on analyst time for questionnaires. Even at $49/month this pays for itself 50x over. Instant subscribe.",
                author: "Alex Kumar",
                role: "CISO",
                company: "FinTech",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-white border-2 border-gray-100 p-6 rounded-2xl hover:border-blue-200 hover:shadow-lg transition"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="border-t pt-4">
                  <p className="font-bold text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 rounded-3xl p-12 md:p-16 border-2 border-blue-200 shadow-xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Join {waitlistCount + 1}+ people on the waitlist
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Be the first to know when we launch. Get 50% lifetime discount as an
            early member.
          </p>

          {!submitted ? (
            <div className="max-w-md mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                  className="flex-1 px-6 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!email || !email.includes("@") || loading}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Joining..." : "Join Waitlist"}
                  {!loading && <ArrowRight className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                🎁 Early access + 50% lifetime discount for waitlist members
              </p>
            </div>
          ) : (
            <div className="max-w-md mx-auto mb-8 bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                You are on the list!
              </h3>
              <p className="text-gray-600 mb-4">
                Check your email for next steps. We will notify you when we
                launch.
              </p>
              <div className="text-sm text-green-700 font-medium">
                ✓ Confirmation sent to {email}
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Launching in 3 weeks</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-600" />
              <span>Limited spots available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-gray-200">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg"></div>
            <span className="font-bold text-gray-900 text-lg">
              QuestionnaireAI
            </span>
          </div>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Auto-fill security questionnaires in 30 minutes with AI. Save time,
            reduce errors, close deals faster.
          </p>
          <div className="flex justify-center gap-8 text-sm text-gray-600 mb-4">
            <a href="#" className="hover:text-blue-600 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              Terms of Service
            </a>
            <a
              href="mailto:hello@questionnaireai.com"
              className="hover:text-blue-600 transition"
            >
              Contact
            </a>
          </div>
          <p className="text-xs text-gray-500">
            © 2024 QuestionnaireAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
