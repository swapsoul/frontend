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
        target: "http://localhost:4000/api",
        secure: false
  }
]

module.exports = PROXY_CONFIG;