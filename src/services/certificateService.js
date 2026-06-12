// خدمة إنشاء الشهادات الإلكترونية

export function generateCertificate(userName, xp, level) {
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 636;
  const ctx = canvas.getContext("2d");

  const isLegendary = xp >= 1000;
  const isGold = xp >= 600;
  const isSilver = xp >= 300;

  // ---- خلفية ----
  if (isLegendary) {
    const bg = ctx.createLinearGradient(0, 0, 900, 636);
    bg.addColorStop(0, "#0d0221");
    bg.addColorStop(0.5, "#1a0533");
    bg.addColorStop(1, "#0d0221");
    ctx.fillStyle = bg;
  } else if (isGold) {
    const bg = ctx.createLinearGradient(0, 0, 900, 636);
    bg.addColorStop(0, "#0b1120");
    bg.addColorStop(0.5, "#1a1500");
    bg.addColorStop(1, "#0b1120");
    ctx.fillStyle = bg;
  } else {
    const bg = ctx.createLinearGradient(0, 0, 900, 636);
    bg.addColorStop(0, "#0b1120");
    bg.addColorStop(1, "#111827");
    ctx.fillStyle = bg;
  }
  ctx.fillRect(0, 0, 900, 636);

  // ---- نجوم للمستوى الأسطوري ----
  if (isLegendary) {
    ctx.fillStyle = "rgba(255,215,0,0.6)";
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * 900;
      const y = Math.random() * 636;
      const r = Math.random() * 2 + 0.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // ---- إطار خارجي ----
  const borderColor = isLegendary
    ? "#b833ff"
    : isGold
    ? "#f59e0b"
    : isSilver
    ? "#94a3b8"
    : "#3b82f6";

  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 4;
  roundRect(ctx, 18, 18, 864, 600, 20);
  ctx.stroke();

  ctx.strokeStyle = borderColor.replace(")", ", 0.3)").replace("rgb", "rgba");
  ctx.lineWidth = 1.5;
  roundRect(ctx, 28, 28, 844, 580, 16);
  ctx.stroke();

  // ---- زينة الأركان ----
  drawCornerOrnament(ctx, 40, 40, borderColor);
  drawCornerOrnament(ctx, 860, 40, borderColor, true);
  drawCornerOrnament(ctx, 40, 596, borderColor, false, true);
  drawCornerOrnament(ctx, 860, 596, borderColor, true, true);

  // ---- شعار ----
  ctx.font = "bold 28px Cairo, Arial";
  ctx.fillStyle = borderColor;
  ctx.textAlign = "center";
  ctx.fillText("🛡️ Study Shield", 450, 90);

  // ---- خط فاصل ----
  const grad = ctx.createLinearGradient(100, 0, 800, 0);
  grad.addColorStop(0, "transparent");
  grad.addColorStop(0.5, borderColor);
  grad.addColorStop(1, "transparent");
  ctx.strokeStyle = grad;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(100, 108);
  ctx.lineTo(800, 108);
  ctx.stroke();

  // ---- عنوان الشهادة ----
  ctx.font = "bold 22px Cairo, Arial";
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.fillText("شهادة إنجاز", 450, 148);

  // ---- اسم المستخدم ----
  const nameGrad = ctx.createLinearGradient(200, 0, 700, 0);
  if (isLegendary) {
    nameGrad.addColorStop(0, "#e040fb");
    nameGrad.addColorStop(0.5, "#ffffff");
    nameGrad.addColorStop(1, "#b833ff");
  } else if (isGold) {
    nameGrad.addColorStop(0, "#f59e0b");
    nameGrad.addColorStop(0.5, "#ffffff");
    nameGrad.addColorStop(1, "#f59e0b");
  } else {
    nameGrad.addColorStop(0, "#60a5fa");
    nameGrad.addColorStop(1, "#ffffff");
  }
  ctx.font = "bold 52px Cairo, Arial";
  ctx.fillStyle = nameGrad;
  ctx.fillText(userName, 450, 230);

  // ---- نص تقديري ----
  ctx.font = "20px Cairo, Arial";
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.fillText("حقق هذا المتميز إنجازات استثنائية في منصة Study Shield", 450, 278);

  // ---- بيانات الإنجاز ----
  drawStatBox(ctx, 210, 320, xp + " XP", "نقاط الخبرة", borderColor);
  drawStatBox(ctx, 450, 320, level, "المستوى", borderColor);
  drawStatBox(ctx, 690, 320, new Date().getFullYear().toString(), "السنة", borderColor);

  // ---- خط فاصل ----
  ctx.strokeStyle = grad;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(100, 430);
  ctx.lineTo(800, 430);
  ctx.stroke();

  // ---- رسالة تحفيزية ----
  ctx.font = "italic 18px Cairo, Arial";
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  const motivationalMsg = isLegendary
    ? "«الأسطورة لا تنتظر الفرصة — تصنعها»"
    : isGold
    ? "«الذهب لا يُصهر إلا بالنار — وأنت تجاوزتها»"
    : isSilver
    ? "«الفضة اليوم، والذهب في الطريق»"
    : "«كل خبير كان مبتدئاً — واصل»";
  ctx.fillText(motivationalMsg, 450, 468);

  // ---- التاريخ ----
  ctx.font = "15px Cairo, Arial";
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  const dateStr = new Date().toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  ctx.fillText("بتاريخ: " + dateStr, 450, 560);

  // ---- ختم ----
  ctx.font = "30px Arial";
  ctx.fillText(
    isLegendary ? "💎" : isGold ? "🥇" : isSilver ? "🥈" : "🥉",
    450,
    530
  );

  return canvas.toDataURL("image/png");
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawCornerOrnament(ctx, x, y, color, flipX = false, flipY = false) {
  ctx.save();
  ctx.translate(x, y);
  if (flipX) ctx.scale(-1, 1);
  if (flipY) ctx.scale(1, -1);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 20);
  ctx.lineTo(0, 0);
  ctx.lineTo(20, 0);
  ctx.stroke();
  ctx.restore();
}

function drawStatBox(ctx, cx, y, value, label, color) {
  // خلفية
  ctx.fillStyle = "rgba(255,255,255,0.05)";
  roundRect(ctx, cx - 90, y - 30, 180, 90, 12);
  ctx.fill();
  ctx.strokeStyle = color + "44";
  ctx.lineWidth = 1;
  roundRect(ctx, cx - 90, y - 30, 180, 90, 12);
  ctx.stroke();

  ctx.font = "bold 26px Cairo, Arial";
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.fillText(value, cx, y + 12);

  ctx.font = "14px Cairo, Arial";
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.fillText(label, cx, y + 38);
}