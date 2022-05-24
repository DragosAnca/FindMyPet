const PROXY_CONFIG = [
  {
      context: [
          "/my",
          "/many",
          "/endpoints",
          "/i",
          "/need",
          "/to",
          "/proxy"
      ],
      target: "https://localhost:7081",
      secure: true
  }
]

module.exports = PROXY_CONFIG;