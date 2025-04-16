module.exports = {
    expo: {
      name: "unimenu-mobile",
      slug: "unimenu-mobile",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/images/icon.png",
      scheme: "unimenu",
      android: {
        permissions: ["INTERNET"],
        intentFilters: [
          {
            action: "VIEW",
            data: [
              {
                scheme: "unimenu"
              }
            ],
            category: ["BROWSABLE", "DEFAULT"]
          }
        ],
        package: "com.meuapp.android",
        adaptiveIcon: {
          foregroundImage: "./assets/images/adaptive-icon.png",
          backgroundColor: "#ffffff"
        }
      },
      userInterfaceStyle: "automatic",
      newArchEnabled: true,
      ios: {
        supportsTablet: true
      },
      web: {
        bundler: "metro",
        output: "static"
      },
      plugins: [
        "expo-router",
        [
          "expo-splash-screen",
          {
            image: "./assets/images/splash-icon.png",
            imageWidth: 200,
            resizeMode: "contain",
            backgroundColor: "#ffffff"
          }
        ]
      ],
      experiments: {
        typedRoutes: true
      },
      extra: {
        apiUrl: "http://192.168.2.100:3000"
      }
    }
  };
=======
        name: "unimenu-mobile",
        slug: "unimenu-mobile",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/icon.png",
        scheme: "myapp",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        ios: {
            supportsTablet: true,
        },
        android: {
            package: "com.meuapp.android",
            adaptiveIcon: {
                foregroundImage: "./assets/images/adaptive-icon.png",
                backgroundColor: "#ffffff",
            },
        },
        web: {
            bundler: "metro",
            output: "static",
        },
        plugins: [
            "expo-router",
            [
                "expo-splash-screen",
                {
                    image: "./assets/images/splash-icon.png",
                    imageWidth: 200,
                    resizeMode: "contain",
                    backgroundColor: "#ffffff",
                },
            ],
        ],
        experiments: {
            typedRoutes: true,
        },
        extra: {
            apiUrl: "http://192.168.2.100:3000",
        },
    },
};

