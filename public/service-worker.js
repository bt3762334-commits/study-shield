self.addEventListener(
  "push",
  (event) => {
    const data =
      event.data?.json?.() ||
      {};

    const options = {
      body: data.body ||
        "لديك تذكير جديد",
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      tag: "study-reminder",
      requireInteraction: true,
      ...data.options
    };

    event.waitUntil(
      self.registration
        .showNotification(
          data.title ||
            "Study Shield",
          options
        )
    );
  }
);

self.addEventListener(
  "notificationclick",
  (event) => {
    event.notification.close();

    event.waitUntil(
      clients.matchAll({
        type: "window"
      }).then((clientList) => {
        for (
          let i = 0;
          i < clientList.length;
          i++
        ) {
          const client =
            clientList[i];

          if (
            client.url === "/" &&
            "focus" in client
          ) {
            return client.focus();
          }
        }

        if (
          clients.openWindow
        ) {
          return clients
            .openWindow("/");
        }
      })
    );
  }
);

self.addEventListener(
  "notificationclose",
  (event) => {
    console.log(
      "Notification closed:",
      event.notification.tag
    );
  }
);
