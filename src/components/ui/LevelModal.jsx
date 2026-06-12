import { useEffect, useState } from "react";

const levelMessages = {
  "🌱 مبتدئ": [
    "كل رحلة تبدأ بخطوة واحدة — أنت على الطريق الصح! 🌱",
    "البداية هي أصعب جزء، وقد تجاوزتها! استمر 💪",
    "بذرة الإنجاز زُرعت — أسقها كل يوم بالعمل! 🌿"
  ],
  "🥉 برونزي": [
    "البرونز بداية للذهب! أنت تتقدم بثبات 🥉",
    "100 XP في جيبك — هذا ليس حظاً، هذا مجهود حقيقي! 🔥",
    "الناس اللي بيوصلوا للقمة بدأوا من هنا بالظبط! 💫"
  ],
  "🥈 فضي": [
    "الفضة تلمع لكن الذهب أجمل — واصل! 🥈",
    "300 XP! أنت في النصف الأصعب، وبتعدي بجدارة 🌟",
    "مستواك بيقول إنك مش بس بتبدأ — أنت بتُنجز! ⚡"
  ],
  "🥇 ذهبي": [
    "ذهبي! هذا المستوى مش كل الناس بتوصله 🥇",
    "600 XP — رحلة كاملة من الإنجاز والمثابرة! 🏆",
    "أنت من النوع اللي بيكمل حتى لو صعب! هذا نادر 💎"
  ],
  "💎 أسطوري": [
    "أسطورة! حرفياً — 1000 XP من العمل والتركيز 💎",
    "وصلت لأعلى مستوى! Study Shield فخور بيك 🛡️✨",
    "هذا ليس مستوى — هذا إرث! استمر في كتابة قصتك 🌠"
  ]
};

export default function LevelModal({ level, onClose }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const msgs = levelMessages[level] || levelMessages["🌱 مبتدئ"];
    const today = new Date().getDay();
    setMessage(msgs[today % msgs.length]);
  }, [level]);

  return (
    <div className="level-modal-overlay" onClick={onClose}>
      <div className="level-modal" onClick={(e) => e.stopPropagation()}>
        <div className="level-modal-icon">{level.split(" ")[0]}</div>
        <h2>مستواك الحالي</h2>
        <div className="level-badge">{level}</div>
        <p className="level-message">{message}</p>
        <button className="level-close-btn" onClick={onClose}>
          شكراً، لنكمل! 💪
        </button>
      </div>
    </div>
  );
}