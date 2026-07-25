import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  ArrowRight, X, Shield, Globe2, Clock, MousePointerClick, Send, Plus, Minus,
  Instagram, Linkedin, ChevronRight, Sun, Moon, Languages, Menu, Check,
  MessageCircle, Receipt, BarChart3, CalendarClock, Star, Sparkles, Share2,
  Newspaper, CalendarDays, Handshake, Bell, FileSearch, Timer, Mail,
  ClipboardCheck, CalendarCheck2, Wallet, Pill, ClipboardList, Camera,
  Activity, Droplet, LineChart, Phone, Grid3x3, Bot, FileText, LayoutGrid,
  Palette, Hash, FileSpreadsheet, Presentation, Inbox, Utensils,
} from "lucide-react";

/* ---------------------------------------------------------
   THEME
--------------------------------------------------------- */
const THEMES = {
  dark: { bg: "#0D1117", elevated: "#131822", text: "#F5F7FA", muted: "#A6B0C0", muted2: "#8892A0", muted3: "#6B7686", border: "rgba(255,255,255,0.07)", borderStrong: "#2A3242", orb1: "#2563EB55", orb2: "#06B6D455", overlay: "rgba(5,7,11,0.72)", dot: "rgba(255,255,255,0.05)", danger: "#F87171" },
  light: { bg: "#F3F5F8", elevated: "#FFFFFF", text: "#0D1117", muted: "#3F4756", muted2: "#5B6472", muted3: "#7C8494", border: "rgba(13,17,23,0.08)", borderStrong: "#DCE1E8", orb1: "#2563EB2E", orb2: "#06B6D42E", overlay: "rgba(240,242,246,0.78)", dot: "rgba(13,17,23,0.05)", danger: "#DC2626" },
};
const SEGMENT_COLORS = { business: "#C9962A", creators: "#7C3AED", students: "#2563EB", parents: "#EA580C", health: "#0D9488" };

const INNER_TOOLS = [
  { label: "WhatsApp", icon: Phone, color: "#25D366" },
  { label: "Gmail", icon: Mail, color: "#EA4335" },
  { label: "Sheets", icon: Grid3x3, color: "#0F9D58" },
  { label: "OpenAI", icon: Sparkles, color: "#10A37F" },
  { label: "Claude", icon: Bot, color: "#CC785C" },
  { label: "Notion", icon: FileText, color: "#94A3B8" },
];
const OUTER_TOOLS = [
  { label: "Slack", icon: Hash, color: "#8B5CF6" },
  { label: "Telegram", icon: Send, color: "#26A5E4" },
  { label: "Outlook", icon: Inbox, color: "#0078D4" },
  { label: "Airtable", icon: LayoutGrid, color: "#FCB400" },
  { label: "Canva", icon: Palette, color: "#8B3DFF" },
  { label: "Excel", icon: FileSpreadsheet, color: "#217346" },
  { label: "PowerPoint", icon: Presentation, color: "#D24726" },
  { label: "Instagram", icon: Camera, color: "#E1306C" },
  { label: "Calendar", icon: CalendarDays, color: "#4285F4" },
];

/* ---------------------------------------------------------
   TRANSLATIONS
--------------------------------------------------------- */
const UI = {
  en: {
    cta: "Get in touch", segLabels: { business: "Business", creators: "Creators", students: "Students", parents: "Parents", health: "Health" },
    menu: { home: "Home", products: "Products", how: "How it works", why: "Why Taskless", contact: "Get in touch", faq: "FAQ" },
    heroBadge: "Automation, connected", heroLine1: "Your to-do list", heroLine2: "just disappeared.",
    heroSub: "We connect the tools you already use into AI-powered workflows that eliminate repetitive work, cut mistakes, and save hours every week — delivered in 48 hours, no coding required.",
    heroCta: "Browse Workflows", scroll: "Scroll",
    integrationsLabel: "Works with the tools you already use", moreTools: "+ 7 more",
    railEyebrow: "Popular Workflows", railTitle: "Ready-to-use automations", railIntro: "Each one solves a repetitive problem a real business runs into every week.", swipeHint: "swipe to browse", viewAll: "View all 25", seeMore: "View Workflow",
    deliverySimple: "24–48h", deliveryStandard: "48h min", deliveryComplex: "48–72h",
    automateLabel: "Automate", viaWhatsapp: "Delivered via WhatsApp",
    trust: [
      { t: "48 Hours", b: "Delivered", d: "Every workflow goes from request to running in two days." },
      { t: "Your Data", b: "Stays yours", d: "Per-client credentials. Nothing crosses between accounts, ever." },
      { t: "Built for Qatar", b: "Locally rooted", d: "WhatsApp-native, bilingual EN/AR, priced in QAR." },
      { t: "Zero Setup", b: "On your end", d: "You never touch a dashboard. You just get the result." },
    ],
    howEyebrow: "How it works", howTitle: "From problem to running automation",
    howSteps: [
      { t: "Tell us the task", d: "Describe the repetitive work you want gone — a form, a message, or a quick call." },
      { t: "We design the automation", d: "We map it, build it, and test it against your real accounts." },
      { t: "You get your time back", d: "It runs quietly in the background. You just see the result." },
    ],
    pricingTitle: "Why isn't there pricing on this page?", pricingBody: "Every business runs on a different mix of tools and workflows, so each automation is scoped to fit yours. Tell us what you need below and we'll come back with a clear, fixed quote.",
    inquiryTitle: "Tell us what's eating your time", inquirySub: "No pricing on the page — we'll get back to you within 24 hours with a plan.",
    namePh: "Your name", mobilePh: "Mobile number", emailPh: "Email address", descPh: "What would you like automated?", send: "Send inquiry",
    formError: "Please fill in your name, mobile number, and message.",
    successTitle: "Got it — thank you.", successBody: "We'll get back to you within 24 hours with a plan.", sendAnother: "Send another",
    footAbout: "Automation-as-a-service for Qatar and the GCC. We eliminate manual repetitive work — no technical knowledge required from you.",
    footBrandLine: "Time belongs to people, not repetitive work.", copyright: "Powered by Taskless · © 2026 All rights reserved.",
    faqTitle: "FAQ", legalTitle: "Legal", privacy: "Privacy Policy", terms: "Terms of Service",
    faqs: [
      { q: "Do I need any technical knowledge?", a: "No. You connect your accounts once through a guided process — we handle everything after that." },
      { q: "How fast is delivery?", a: "48 hours or less from agreed scope to a running workflow." },
      { q: "Is my data safe?", a: "Yes — isolated per-client credentials, encrypted storage, and a signed Data Processing Agreement before any project starts." },
    ],
    tagline: "Taskless — Your to-do list just disappeared.",
    drawer: { before: "Before Taskless", after: "After Taskless", need: "What we need from you", cta: "Get this running for me" },
    catalogTitle: "All workflows", catalogSub: "25 workflows — search or filter by category to find yours.", back: "Back",
    searchPh: "Search workflows...", allCategories: "All",
  },
  ar: {
    cta: "تواصل معنا", segLabels: { business: "أعمال", creators: "مبدعون", students: "طلاب", parents: "أهالي", health: "صحة" },
    menu: { home: "الرئيسية", products: "الخدمات", how: "كيف نعمل", why: "لماذا Taskless", contact: "تواصل معنا", faq: "الأسئلة الشائعة" },
    heroBadge: "أتمتة متصلة", heroLine1: "قائمة مهامك", heroLine2: "اختفت للتو.",
    heroSub: "نربط الأدوات التي تستخدمها فعلاً في أتمتة مدعومة بالذكاء الاصطناعي تُلغي العمل المتكرر، تقلل الأخطاء، وتوفر ساعات كل أسبوع — تُسلَّم خلال 48 ساعة، بلا برمجة.",
    heroCta: "تصفح الأتمتة", scroll: "مرر للأسفل",
    integrationsLabel: "يعمل مع الأدوات التي تستخدمها فعلاً", moreTools: "+ 7 أدوات أخرى",
    railEyebrow: "الأتمتة الأكثر طلباً", railTitle: "أتمتة جاهزة للاستخدام", railIntro: "كل واحدة تحل مشكلة متكررة يواجهها أي عمل كل أسبوع.", swipeHint: "اسحب للتصفح", viewAll: "عرض الكل (25)", seeMore: "عرض الأتمتة",
    deliverySimple: "24–48 ساعة", deliveryStandard: "48 ساعة كحد أدنى", deliveryComplex: "48–72 ساعة",
    automateLabel: "أتمتة", viaWhatsapp: "يُسلَّم عبر واتساب",
    trust: [
      { t: "48 ساعة", b: "التسليم", d: "كل أتمتة تنتقل من الطلب إلى التشغيل خلال يومين." },
      { t: "بياناتك", b: "تبقى لك", d: "بيانات اعتماد مستقلة لكل عميل. لا تداخل بين الحسابات أبداً." },
      { t: "مصمم لقطر", b: "جذور محلية", d: "يعمل عبر واتساب، ثنائي اللغة عربي/إنجليزي، بالريال القطري." },
      { t: "بلا إعداد", b: "من جانبك", d: "لا تلمس أي لوحة تحكم أبداً. تستلم النتيجة فقط." },
    ],
    howEyebrow: "كيف نعمل", howTitle: "من المشكلة إلى الأتمتة الجاهزة",
    howSteps: [
      { t: "أخبرنا بالمهمة", d: "صف العمل المتكرر الذي تريد التخلص منه — نموذج، رسالة، أو مكالمة سريعة." },
      { t: "نصمم الأتمتة", d: "نخطط لها، نبنيها، ونختبرها على حساباتك الحقيقية." },
      { t: "تستعيد وقتك", d: "تعمل بهدوء في الخلفية. أنت فقط ترى النتيجة." },
    ],
    pricingTitle: "لماذا لا توجد أسعار في هذه الصفحة؟", pricingBody: "كل عمل يستخدم مزيجاً مختلفاً من الأدوات وسير العمل، لذا نصمم كل أتمتة لتناسبك تحديداً. أخبرنا بما تحتاجه أدناه وسنعود إليك بعرض سعر واضح وثابت.",
    inquiryTitle: "أخبرنا بما يستهلك وقتك", inquirySub: "لا أسعار في الصفحة — سنرد عليك خلال 24 ساعة بخطة عمل.",
    namePh: "اسمك", mobilePh: "رقم الجوال", emailPh: "البريد الإلكتروني", descPh: "ماذا تريد أن نؤتمت؟", send: "إرسال الطلب",
    formError: "يرجى تعبئة الاسم ورقم الجوال والرسالة.",
    successTitle: "تم الاستلام — شكراً لك.", successBody: "سنرد عليك خلال 24 ساعة بخطة عمل.", sendAnother: "إرسال طلب آخر",
    footAbout: "خدمة أتمتة لقطر ودول الخليج. نلغي العمل اليدوي المتكرر — دون الحاجة لمعرفة تقنية منك.",
    footBrandLine: "الوقت ملك للناس، لا للعمل المتكرر.", copyright: "بدعم من Taskless · © 2026 جميع الحقوق محفوظة.",
    faqTitle: "الأسئلة الشائعة", legalTitle: "قانوني", privacy: "سياسة الخصوصية", terms: "شروط الخدمة",
    faqs: [
      { q: "هل أحتاج إلى معرفة تقنية؟", a: "لا. تربط حساباتك مرة واحدة عبر خطوات موجهة — ونتولى الباقي." },
      { q: "ما مدى سرعة التسليم؟", a: "48 ساعة أو أقل من تحديد النطاق إلى تشغيل الأتمتة." },
      { q: "هل بياناتي آمنة؟", a: "نعم — بيانات اعتماد معزولة لكل عميل، تخزين مشفّر، واتفاقية معالجة بيانات موقعة قبل أي مشروع." },
    ],
    tagline: "Taskless — قائمة مهامك اختفت للتو.",
    drawer: { before: "قبل Taskless", after: "بعد Taskless", need: "ماذا نحتاج منك", cta: "فعّل هذا لي" },
    catalogTitle: "كل الأتمتة", catalogSub: "25 أتمتة — ابحث أو صفّ حسب الفئة لتجد ما يناسبك.", back: "رجوع",
    searchPh: "ابحث في الأتمتة...", allCategories: "الكل",
  },
};

/* ---------------------------------------------------------
   PRODUCTS — each with distinct trigger + output for its flow visual
--------------------------------------------------------- */
const FALLBACK_PRODUCTS = [
  { id: "B1", seg: "business", icon: MessageCircle, outIcon: MessageCircle, en: { name: "Lead Alert", hook: "Someone contacts you — WhatsApp instantly", before: "Leads sit in an inbox for hours before anyone replies.", after: "Every lead reaches you on WhatsApp within seconds, while their interest is still warm.", need: "Your form or lead source, plus a WhatsApp number.", inLabel: "New lead", outLabel: "WhatsApp alert" }, ar: { name: "تنبيه العميل المحتمل", hook: "شخص يتواصل معك — واتساب فوراً", before: "العملاء المحتملون ينتظرون ساعات قبل أن يرد أحد.", after: "كل عميل محتمل يصلك على واتساب خلال ثوانٍ.", need: "نموذجك أو مصدر العملاء، ورقم واتساب.", inLabel: "عميل جديد", outLabel: "تنبيه واتساب" } },
  { id: "B2", seg: "business", icon: Receipt, outIcon: Grid3x3, en: { name: "Invoice Scanner", hook: "Photo any invoice — data logged automatically", before: "Someone retypes every invoice into a spreadsheet by hand.", after: "A photo becomes a logged, categorized entry in seconds.", need: "Where invoices arrive and your bookkeeping sheet.", inLabel: "Invoice", outLabel: "Logged entry" }, ar: { name: "ماسح الفواتير", hook: "صوّر أي فاتورة — تُسجَّل تلقائياً", before: "شخص يعيد كتابة كل فاتورة يدوياً في جدول بيانات.", after: "الصورة تتحول إلى قيد مصنّف خلال ثوانٍ.", need: "مكان وصول الفواتير وجدول الحسابات.", inLabel: "فاتورة", outLabel: "قيد مسجّل" } },
  { id: "B3", seg: "business", icon: BarChart3, outIcon: BarChart3, en: { name: "Daily Business Report", hook: "8am WhatsApp — yesterday's numbers", before: "You call around each morning just to find out how yesterday went.", after: "One WhatsApp at 8am tells you sales, top product, and team status.", need: "Access to your sales data and morning send time.", inLabel: "Sales data", outLabel: "Daily report" }, ar: { name: "التقرير اليومي للأعمال", hook: "واتساب الساعة 8 صباحاً — أرقام الأمس", before: "تتصل كل صباح لمعرفة كيف سار العمل بالأمس.", after: "رسالة واحدة الساعة 8 صباحاً: المبيعات وأفضل منتج.", need: "الوصول لبيانات المبيعات ووقت الإرسال.", inLabel: "بيانات المبيعات", outLabel: "تقرير يومي" } },
  { id: "B4", seg: "business", icon: CalendarClock, outIcon: Bell, en: { name: "Expiry Reminder", hook: "Contracts & visas — alerts before they lapse", before: "Rental contracts and employee visas expire without warning.", after: "WhatsApp alerts land 30, 14, and 7 days before anything expires.", need: "A list of your contracts/visas and expiry dates.", inLabel: "Contract/visa", outLabel: "Expiry alert" }, ar: { name: "تذكير انتهاء الصلاحية", hook: "العقود والإقامات — تنبيهات قبل الانتهاء", before: "عقود الإيجار وإقامات الموظفين تنتهي دون سابق إنذار.", after: "تنبيهات واتساب قبل 30 و14 و7 أيام من أي انتهاء.", need: "قائمة عقودك/إقاماتك وتواريخها.", inLabel: "عقد/إقامة", outLabel: "تنبيه انتهاء" } },
  { id: "B5", seg: "business", icon: Star, outIcon: Star, en: { name: "Review Request", hook: "Job done — review request sent automatically", before: "Happy customers leave without ever being asked for a review.", after: "A review request goes out the moment a job is marked complete.", need: "Your job-completion trigger and review link.", inLabel: "Job done", outLabel: "Review request" }, ar: { name: "طلب التقييم", hook: "انتهاء العمل — طلب تقييم تلقائي", before: "العملاء الراضون يغادرون دون أن يُطلب منهم تقييم.", after: "طلب التقييم يُرسل فور تأشير العمل كمكتمل.", need: "مُشغّل اكتمال العمل ورابط التقييم.", inLabel: "اكتمال العمل", outLabel: "طلب تقييم" } },
  { id: "C1", seg: "creators", icon: Sparkles, outIcon: Share2, en: { name: "Auto Caption", hook: "Type a topic — post goes live with caption + hashtags", before: "Writing one caption eats 30 minutes you don't have.", after: "Give it a topic; it writes, tags, and schedules the post.", need: "Your content calendar and social accounts.", inLabel: "Topic", outLabel: "Live post" }, ar: { name: "التسمية التلقائية", hook: "اكتب موضوعاً — يُنشر بالتسمية والهاشتاغ", before: "كتابة تسمية واحدة تستهلك 30 دقيقة لا تملكها.", after: "أعطها موضوعاً؛ تكتب وتُصنّف وتُجدول المنشور.", need: "تقويم المحتوى وحسابات التواصل.", inLabel: "موضوع", outLabel: "منشور مباشر" } },
  { id: "C2", seg: "creators", icon: Share2, outIcon: Share2, en: { name: "Multi-Platform Publish", hook: "One upload — live everywhere at once", before: "Posting the same video to five platforms, one at a time.", after: "Upload once, it's live on every platform in minutes.", need: "Logins for the platforms you post to.", inLabel: "Video", outLabel: "Published" }, ar: { name: "النشر متعدد المنصات", hook: "رفعة واحدة — تظهر في كل مكان فوراً", before: "نشر نفس الفيديو على خمس منصات، واحدة تلو الأخرى.", after: "ارفع مرة واحدة، يظهر على كل منصة خلال دقائق.", need: "بيانات الدخول للمنصات.", inLabel: "فيديو", outLabel: "منشور" } },
  { id: "C3", seg: "creators", icon: Newspaper, outIcon: Newspaper, en: { name: "Niche News Briefing", hook: "Morning WhatsApp — 5 trending stories in your niche", before: "45 minutes lost daily hunting for content ideas.", after: "One WhatsApp with five summarized stories, ready to react to.", need: "Your niche/topics and send time.", inLabel: "Your niche", outLabel: "News digest" }, ar: { name: "ملخّص أخبار المجال", hook: "واتساب الصباح — 5 قصص رائجة في مجالك", before: "45 دقيقة تُهدر يومياً بحثاً عن أفكار محتوى.", after: "رسالة واحدة بخمس قصص ملخّصة.", need: "مجالك ووقت الإرسال.", inLabel: "مجالك", outLabel: "ملخص أخبار" } },
  { id: "C4", seg: "creators", icon: CalendarDays, outIcon: CalendarDays, en: { name: "Scheduled Auto-Post", hook: "Plan a week in a sheet — it posts itself", before: "Logging in daily to publish, forgetting some days entirely.", after: "Fill a sheet once; the week posts on schedule without you.", need: "A content sheet and platform credentials.", inLabel: "Content sheet", outLabel: "Scheduled post" }, ar: { name: "النشر المجدول", hook: "خطط أسبوعاً في جدول — ينشر نفسه", before: "الدخول يومياً للنشر، ونسيان بعض الأيام تماماً.", after: "املأ الجدول مرة، والأسبوع ينشر حسب الموعد.", need: "جدول محتوى وبيانات دخول المنصات.", inLabel: "جدول محتوى", outLabel: "منشور مجدول" } },
  { id: "C5", seg: "creators", icon: Handshake, outIcon: Handshake, en: { name: "Brand Deal Follow-Up", hook: "No reply in 5 days — follow-up sends itself", before: "Pitches sent and forgotten, deals quietly lost.", after: "Silence for 5 days triggers an automatic, polite follow-up.", need: "Your outreach list and email/DM access.", inLabel: "Pitch sent", outLabel: "Follow-up" }, ar: { name: "متابعة صفقات العلامات", hook: "لا رد خلال 5 أيام — المتابعة تُرسل نفسها", before: "عروض تُرسل وتُنسى، وصفقات تُفقد بصمت.", after: "الصمت لخمسة أيام يُشغّل متابعة تلقائية.", need: "قائمة التواصل ووصول البريد.", inLabel: "عرض مرسل", outLabel: "متابعة" } },
  { id: "S1", seg: "students", icon: Bell, outIcon: Bell, en: { name: "Deadline Reminder", hook: "WhatsApp before every deadline", before: "Submission dates slip by unnoticed.", after: "Alerts 3 days and 1 day before anything is due.", need: "Your assignment list or portal login.", inLabel: "Assignment", outLabel: "Reminder" }, ar: { name: "تذكير المواعيد النهائية", hook: "واتساب قبل كل موعد تسليم", before: "مواعيد التسليم تمر دون ملاحظة.", after: "تنبيهات قبل 3 أيام ويوم واحد من أي موعد.", need: "قائمة واجباتك أو بوابة الجامعة.", inLabel: "واجب", outLabel: "تذكير" } },
  { id: "S2", seg: "students", icon: FileSearch, outIcon: FileSearch, en: { name: "Research Summarizer", hook: "Send a link — get the key points in 60 seconds", before: "Reading five papers takes a full day.", after: "Paste a link, receive the key points back almost instantly.", need: "Nothing but the links you want summarized.", inLabel: "Article link", outLabel: "Key points" }, ar: { name: "ملخّص الأبحاث", hook: "أرسل رابطاً — النقاط الأساسية خلال 60 ثانية", before: "قراءة خمسة أبحاث تستغرق يوماً كاملاً.", after: "الصق رابطاً، واستلم النقاط الأساسية فوراً تقريباً.", need: "لا شيء سوى الروابط.", inLabel: "رابط مقال", outLabel: "نقاط أساسية" } },
  { id: "S3", seg: "students", icon: Sun, outIcon: Sun, en: { name: "Daily Study Plan", hook: "7am WhatsApp — today's plan, built for you", before: "Mornings start with no idea what to study first.", after: "A study plan lands before you're even out of bed.", need: "Your deadlines and subjects.", inLabel: "New day", outLabel: "Study plan" }, ar: { name: "خطة الدراسة اليومية", hook: "واتساب 7 صباحاً — خطة اليوم جاهزة", before: "الصباح يبدأ دون فكرة عمّا يجب دراسته أولاً.", after: "خطة الدراسة تصلك قبل أن تنهض من الفراش.", need: "مواعيدك النهائية وموادك.", inLabel: "يوم جديد", outLabel: "خطة دراسة" } },
  { id: "S4", seg: "students", icon: Timer, outIcon: Timer, en: { name: "Exam Countdown", hook: "Daily countdown + one study tip", before: "No structure to exam prep — just rising anxiety.", after: "A daily nudge: days remaining, plus one useful tip.", need: "Your exam dates.", inLabel: "Exam date", outLabel: "Countdown" }, ar: { name: "عداد الامتحانات", hook: "عد تنازلي يومي + نصيحة دراسة", before: "لا تنظيم للمذاكرة — فقط قلق متصاعد.", after: "تذكير يومي: الأيام المتبقية ونصيحة مفيدة.", need: "تواريخ امتحاناتك.", inLabel: "موعد امتحان", outLabel: "عد تنازلي" } },
  { id: "S5", seg: "students", icon: Mail, outIcon: Mail, en: { name: "Inbox Digest", hook: "Only the emails that need action from you", before: "Important announcements buried in a flooded inbox.", after: "One daily WhatsApp with only what actually needs a reply.", need: "Read access to your university inbox.", inLabel: "New email", outLabel: "Action digest" }, ar: { name: "ملخّص البريد الوارد", hook: "فقط الرسائل التي تحتاج إجراءً منك", before: "الإعلانات المهمة تضيع في بريد مزدحم.", after: "رسالة واتساب يومية بما يحتاج فعلاً إلى رد.", need: "صلاحية قراءة بريدك الجامعي.", inLabel: "بريد جديد", outLabel: "ملخص إجراءات" } },
  { id: "P1", seg: "parents", icon: ClipboardCheck, outIcon: ClipboardCheck, en: { name: "Homework Tracker", hook: "Child logs it — you get the 6pm summary", before: "Asking 'did you do your homework?' with no way to check.", after: "A 2-minute form from your child becomes your evening summary.", need: "A device for your child and your WhatsApp number.", inLabel: "Homework form", outLabel: "Evening summary" }, ar: { name: "متابع الواجبات", hook: "يسجّل الطفل — تستلم ملخص 6 مساءً", before: "تسأل 'هل أنجزت واجبك؟' دون طريقة للتأكد.", after: "نموذج دقيقتين من طفلك يتحول إلى ملخصك المسائي.", need: "جهاز لطفلك ورقم واتساب.", inLabel: "نموذج واجب", outLabel: "ملخص مسائي" } },
  { id: "P2", seg: "parents", icon: CalendarCheck2, outIcon: Bell, en: { name: "School Event Reminder", hook: "Alerts before every meeting and exam date", before: "Parent-teacher meetings and exam dates get missed.", after: "Reminders reach both parent and child, 3 days and 1 day out.", need: "Your school's calendar or event list.", inLabel: "School event", outLabel: "Reminder" }, ar: { name: "تذكير الفعاليات المدرسية", hook: "تنبيهات قبل كل اجتماع وموعد امتحان", before: "اجتماعات أولياء الأمور ومواعيد الامتحانات تُفوَّت.", after: "التذكيرات تصل للوالد والطفل قبل 3 أيام ويوم واحد.", need: "تقويم أو قائمة فعاليات مدرستك.", inLabel: "فعالية مدرسية", outLabel: "تذكير" } },
  { id: "P3", seg: "parents", icon: Wallet, outIcon: Wallet, en: { name: "Family Expense Log", hook: "Photo a receipt — it's logged for everyone", before: "No shared tracker; month-end always brings a surprise.", after: "Any family member snaps a receipt, it's on the shared sheet.", need: "A shared sheet and everyone's WhatsApp numbers.", inLabel: "Receipt photo", outLabel: "Expense logged" }, ar: { name: "سجل مصاريف العائلة", hook: "صوّر إيصالاً — يُسجَّل للجميع", before: "لا متتبع مشترك؛ نهاية الشهر تحمل مفاجأة دائماً.", after: "أي فرد من العائلة يصوّر إيصالاً فيُسجَّل فوراً.", need: "جدول مشترك وأرقام واتساب الجميع.", inLabel: "صورة إيصال", outLabel: "مصروف مسجّل" } },
  { id: "P4", seg: "parents", icon: Pill, outIcon: Check, en: { name: "Medication Reminder", hook: "Reminder sent, yes/no logged, caregiver alerted if missed", before: "A missed dose goes unnoticed until it's a problem.", after: "A reply confirms each dose; a miss alerts the caregiver right away.", need: "The medication schedule and caregiver's number.", inLabel: "Dose time", outLabel: "Confirmation" }, ar: { name: "تذكير الدواء", hook: "تذكير، رد بنعم/لا، تنبيه عند التفويت", before: "الجرعة الفائتة تمر دون ملاحظة حتى تصبح مشكلة.", after: "الرد يؤكد كل جرعة؛ والتفويت ينبّه مقدم الرعاية فوراً.", need: "جدول الدواء ورقم مقدم الرعاية.", inLabel: "وقت الجرعة", outLabel: "تأكيد" } },
  { id: "P5", seg: "parents", icon: ClipboardList, outIcon: ClipboardList, en: { name: "Weekly Academic Summary", hook: "Every Sunday — the full week in one WhatsApp", before: "Grades, attendance, and activities scattered across apps.", after: "One message, every Sunday, with the whole week in view.", need: "Access to your school's parent portal.", inLabel: "Week end", outLabel: "Weekly summary" }, ar: { name: "الملخص الأكاديمي الأسبوعي", hook: "كل أحد — الأسبوع كاملاً في رسالة واحدة", before: "الدرجات والحضور والأنشطة مبعثرة بين التطبيقات.", after: "رسالة واحدة كل أحد تجمع الأسبوع بالكامل.", need: "الوصول لبوابة أولياء الأمور.", inLabel: "نهاية الأسبوع", outLabel: "ملخص أسبوعي" } },
  { id: "H1", seg: "health", icon: Camera, outIcon: Utensils, en: { name: "Meal Photo Analyzer", hook: "Photo your plate — full nutrition breakdown in 15s", before: "No real idea what's actually in the meal you just ate.", after: "A photo returns calories and macros before you finish the bite.", need: "Just your WhatsApp — no app to install.", inLabel: "Meal photo", outLabel: "Nutrition breakdown" }, ar: { name: "محلل صور الوجبات", hook: "صوّر طبقك — تحليل غذائي خلال 15 ثانية", before: "لا فكرة حقيقية عمّا يحتويه الطبق الذي تناولته للتو.", after: "الصورة تُعيد السعرات والعناصر الغذائية.", need: "فقط رقم واتساب.", inLabel: "صورة وجبة", outLabel: "تحليل غذائي" } },
  { id: "H2", seg: "health", icon: Moon, outIcon: Moon, en: { name: "Daily Calorie Summary", hook: "9pm WhatsApp — intake vs. your goal", before: "No visibility on the day's total until it's too late to adjust.", after: "One evening message: consumed, remaining, simple verdict.", need: "Your daily calorie goal.", inLabel: "Day's meals", outLabel: "Calorie summary" }, ar: { name: "ملخّص السعرات اليومي", hook: "واتساب 9 مساءً — الاستهلاك مقابل هدفك", before: "لا رؤية للمجموع اليومي حتى يفوت أوان التعديل.", after: "رسالة مسائية واحدة: المستهلك والمتبقي.", need: "هدفك اليومي من السعرات.", inLabel: "وجبات اليوم", outLabel: "ملخص سعرات" } },
  { id: "H3", seg: "health", icon: Activity, outIcon: Activity, en: { name: "Medication Adherence Log", hook: "Reply yes/no — monthly report for your doctor", before: "Missed doses with no record to show at a check-up.", after: "Every reply is logged into a report ready for your next visit.", need: "Your medication schedule.", inLabel: "Dose time", outLabel: "Adherence report" }, ar: { name: "سجل الالتزام الدوائي", hook: "رد بنعم/لا — تقرير شهري لطبيبك", before: "جرعات فائتة دون سجل يُعرض في الزيارة القادمة.", after: "كل رد يُسجَّل ضمن تقرير جاهز لزيارتك القادمة.", need: "جدول أدويتك.", inLabel: "وقت الجرعة", outLabel: "تقرير التزام" } },
  { id: "H4", seg: "health", icon: Droplet, outIcon: Droplet, en: { name: "Hydration Tracker", hook: "Text '1 glass' — get your daily hydration status", before: "No awareness of how little water you're actually drinking.", after: "A text logs it; a daily report shows where you stand.", need: "Nothing but your WhatsApp number.", inLabel: "Water log", outLabel: "Hydration status" }, ar: { name: "متتبع شرب الماء", hook: "اكتب 'كوب واحد' — احصل على حالتك اليومية", before: "لا وعي بمدى قلة الماء الذي تشربه فعلاً.", after: "رسالة تُسجّل الكوب؛ وتقرير يومي يوضح موقفك.", need: "لا شيء سوى رقم واتساب.", inLabel: "تسجيل ماء", outLabel: "حالة الترطيب" } },
  { id: "H5", seg: "health", icon: LineChart, outIcon: LineChart, en: { name: "Weekly Health Summary", hook: "Sunday WhatsApp — patterns, not just numbers", before: "No big-picture view of your habits over time.", after: "One Sunday message: best/worst days and one real insight.", need: "A few weeks of logged data to build patterns from.", inLabel: "Week's data", outLabel: "Weekly insight" }, ar: { name: "الملخص الصحي الأسبوعي", hook: "واتساب الأحد — أنماط لا أرقام فقط", before: "لا رؤية شاملة لعاداتك عبر الوقت.", after: "رسالة أحد واحدة: أفضل وأسوأ الأيام ورؤية حقيقية.", need: "بضعة أسابيع من البيانات المسجّلة.", inLabel: "بيانات الأسبوع", outLabel: "رؤية أسبوعية" } },
];

/* ---------------------------------------------------------
   ICON_MAP — mirrors the ICON_REGISTRY tab exactly.
   Fetched products carry icon_key/out_icon_key strings (a Sheet cell
   can't hold a component); this is what turns that string back into
   a real icon. Add a row here + in ICON_REGISTRY together, always.
--------------------------------------------------------- */
const ICON_MAP = {
  message_circle: MessageCircle, receipt: Receipt, bar_chart: BarChart3, calendar_clock: CalendarClock,
  star: Star, sparkles: Sparkles, share: Share2, newspaper: Newspaper, calendar_days: CalendarDays,
  handshake: Handshake, bell: Bell, file_search: FileSearch, timer: Timer, mail: Mail,
  clipboard_check: ClipboardCheck, calendar_check: CalendarCheck2, wallet: Wallet, pill: Pill,
  clipboard_list: ClipboardList, camera: Camera, moon: Moon, activity: Activity, droplet: Droplet,
  line_chart: LineChart, sun: Sun, grid: Grid3x3, check: Check, utensils: Utensils,
};

// Replace this with your real n8n webhook once SYSTEM_ProductLibraryFetcher exists
// (same pattern as CONFIG_API in taskless-forms). Left as a placeholder, the site
// silently keeps using FALLBACK_PRODUCTS below — nothing breaks today.
const PRODUCTS_API = "REPLACE_WITH_YOUR_N8N_URL/webhook/products";
const REQUESTS_API = "https://script.google.com/macros/s/AKfycbx6aL1k1GnAuYD2ca2KGgSTN1G5EJSoDLFqyMihp8orCXsRYFZoOyOGPAxp_t8Mlp36/exec";

// Converts one row from the LIBRARY sheet (icon_key strings) into the shape
// every component below already expects (real icon components).
function normalizeProduct(raw) {
  return {
    id: raw.id, seg: raw.segment,
    icon: ICON_MAP[raw.icon_key] || Sparkles,
    outIcon: ICON_MAP[raw.out_icon_key] || Sparkles,
    en: raw.en, ar: raw.ar,
  };
}

function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

// Delivery-time estimate per workflow — a stated assumption, not a fabricated stat.
// SIMPLE: single trigger, single alert, minimal logic. COMPLEX: multi-platform,
// AI vision/summarization, or multi-step confirmation loops. Everything else = standard.
const SIMPLE_DELIVERY_IDS = new Set(["B1", "B5", "S1", "S4", "P2", "H2", "H4"]);
const COMPLEX_DELIVERY_IDS = new Set(["C1", "C2", "B2", "S2", "P4", "H1", "H3"]);
function deliveryLabel(id, t) {
  if (SIMPLE_DELIVERY_IDS.has(id)) return t.deliverySimple;
  if (COMPLEX_DELIVERY_IDS.has(id)) return t.deliveryComplex;
  return t.deliveryStandard;
}
function useReveal() {
  const ref = useRef(null); const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.05, rootMargin: "0px 0px -10% 0px" });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, inView];
}
function scrollToId(id, close) { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); if (close) close(); }

/* ---------------------------------------------------------
   MAIN
--------------------------------------------------------- */
export default function TasklessLanding() {
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = UI[lang]; const rtl = lang === "ar"; const th = THEMES[theme];
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  useEffect(() => {
    if (PRODUCTS_API.startsWith("REPLACE_WITH")) return; // not wired up yet — fallback data stays active
    fetch(PRODUCTS_API)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data?.products) && data.products.length) {
          setProducts(data.products.map(normalizeProduct));
        }
      })
      .catch(() => { /* network/CORS issue — fallback data stays active, site keeps working */ });
  }, []);
  const featured = useMemo(() => shuffle(products).slice(0, 5), [products]);
  const [active, setActive] = useState(null);
  const [requestContext, setRequestContext] = useState({ source: "Website — General Inquiry", product_id: "" });
  const [view, setView] = useState("home");
  const [openFaq, setOpenFaq] = useState(0);
  const [railRef, railIn] = useReveal();
  const [heroDraw, setHeroDraw] = useState(false);
  useEffect(() => { const tm = setTimeout(() => setHeroDraw(true), 150); return () => clearTimeout(tm); }, []);

  return (
    <div dir={rtl ? "rtl" : "ltr"} lang={lang} style={{ position: "relative", background: th.bg, color: th.text, fontFamily: rtl ? "'Tajawal', Inter, sans-serif" : "Inter, sans-serif", minHeight: "100vh", overflowX: "hidden", transition: "background .3s, color .3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=Tajawal:wght@400;500;700&display=swap');
        * { box-sizing: border-box; }
        .display { font-family: ${rtl ? "'Tajawal', sans-serif" : "'Space Grotesk', sans-serif"}; }
        .rail::-webkit-scrollbar { height: 6px; }
        .rail::-webkit-scrollbar-thumb { background: linear-gradient(90deg,#2563EB,#06B6D4); border-radius: 4px; }
        button, input, textarea { font-family: inherit; }
        button { display: inline-flex; align-items: center; }
        .card:focus-visible, button:focus-visible, .faq-btn:focus-visible, .menu-link:focus-visible { outline: 2px solid #06B6D4; outline-offset: 3px; }
        @keyframes drift { 0%,100% { transform: translate(0,0);} 50% { transform: translate(22px,-18px);} }
        @keyframes float { 0%,100% { transform: translateY(0) rotate(0deg);} 50% { transform: translateY(-12px) rotate(5deg);} }
        @keyframes pulse { 0%,100% { opacity:.55;} 50% { opacity:1;} }
        @keyframes slideup { from { transform: translateY(40px); opacity:0;} to { transform: translateY(0); opacity:1;} }
        @keyframes bgpan { from { background-position: 0 0; } to { background-position: 120px 120px; } }
        @keyframes hubglow { 0%,100% { opacity:.5;} 50% { opacity:1;} }
        @keyframes popin { from { opacity:0; transform: scale(.9);} to { opacity:1; transform: scale(1);} }
        .hero-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 30px; align-items: center; }
        .card-hover:hover { transform: translateY(-4px) !important; box-shadow: 0 16px 32px rgba(0,0,0,0.18); border-color: #06B6D460 !important; }
        .integration-chip:hover { border-color: #06B6D4 !important; }
        .cta-hover { transition: transform .2s ease, box-shadow .2s ease; }
        .cta-hover:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(37,99,235,0.35); }
        .filter-pill { transition: all .2s ease; }
        .filter-pill:hover { border-color: #06B6D4 !important; }
        .footer-grid { display: grid; grid-template-columns: 1.3fr 1fr 0.7fr; gap: 50px; }
        @media (max-width: 700px) { .footer-grid { grid-template-columns: 1fr; gap: 32px; } }
        @media (max-width: 900px) { .hero-grid { grid-template-columns: 1fr; } .hero-diagram { order: -1; margin-bottom: 4px; } }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
      `}</style>

      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: `radial-gradient(${th.dot} 1.5px, transparent 1.5px)`, backgroundSize: "26px 26px", animation: "bgpan 14s linear infinite" }} />

      <div style={{ position: "relative", zIndex: 1 }}>
      {view === "home" ? (
        <>
          <header style={{ position: "sticky", top: 0, zIndex: 30, backdropFilter: "blur(10px)", background: theme === "dark" ? "rgba(13,17,23,0.75)" : "rgba(243,245,248,0.8)", borderBottom: `1px solid ${th.border}` }}>
            <div style={{ maxWidth: 1180, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <TLogo size={26} /><span className="display" style={{ fontWeight: 700, fontSize: 18, letterSpacing: -0.3 }}>Taskless</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button className="cta-hover" style={btnPrimary} onClick={() => { setRequestContext({ source: "Website — General Inquiry", product_id: "" }); scrollToId("section-contact"); }}>{t.cta}</button>
                <IconToggle onClick={() => setMenuOpen(!menuOpen)} th={th} label="Menu"><Menu size={18} /></IconToggle>
              </div>
            </div>
            {menuOpen && (
              <div style={{ borderTop: `1px solid ${th.border}`, background: th.elevated }}>
                <div style={{ maxWidth: 1180, margin: "0 auto", padding: "18px 24px", display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "space-between" }}>
                  <nav style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {[["section-hero", t.menu.home], ["section-products", t.menu.products], ["section-how", t.menu.how || "How it works"], ["section-why", t.menu.why], ["section-contact", t.menu.contact], ["section-faq", t.menu.faq]].map(([id, label]) => (
                      <button key={id} className="menu-link" onClick={() => scrollToId(id, () => setMenuOpen(false))} style={{ background: "none", border: "none", color: th.text, fontSize: 14.5, fontWeight: 600, padding: "8px 12px", borderRadius: 8, cursor: "pointer" }}>{label}</button>
                    ))}
                  </nav>
                  <div style={{ display: "flex", gap: 10 }}>
                    <IconToggle onClick={() => setTheme(theme === "dark" ? "light" : "dark")} th={th} label="Theme">{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}</IconToggle>
                    <IconToggle onClick={() => setLang(lang === "en" ? "ar" : "en")} th={th} label="Language" wide><Languages size={16} /> {lang === "en" ? "عربي" : "EN"}</IconToggle>
                  </div>
                </div>
              </div>
            )}
          </header>

          <section id="section-hero" style={{ position: "relative", padding: "76px 24px 90px", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -80, [rtl ? "right" : "left"]: "5%", width: 340, height: 340, borderRadius: "50%", background: `radial-gradient(circle,${th.orb1},transparent 70%)`, animation: "drift 9s ease-in-out infinite", filter: "blur(6px)" }} />
            <div style={{ position: "absolute", bottom: -100, [rtl ? "left" : "right"]: "4%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle,${th.orb2},transparent 70%)`, animation: "drift 11s ease-in-out infinite reverse", filter: "blur(6px)" }} />

            <div className="hero-grid" style={{ maxWidth: 1180, margin: "0 auto", position: "relative", zIndex: 2 }}>
              <div style={{ textAlign: rtl ? "right" : "left" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "#06B6D4", background: th.elevated, border: `1px solid ${th.borderStrong}`, borderRadius: 20, padding: "6px 14px", marginBottom: 22 }}><Sparkles size={13} /> {t.heroBadge}</span>
                <h1 className="display" style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 18px", letterSpacing: rtl ? 0 : -1 }}>{t.heroLine1}<br /><span style={{ background: "linear-gradient(90deg,#2563EB,#06B6D4)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{t.heroLine2}</span></h1>
                <p style={{ maxWidth: 440, fontSize: 16.5, color: th.muted, lineHeight: 1.7, margin: rtl ? "0 0 30px auto" : "0 30px 30px 0" }}>{t.heroSub}</p>
                <button className="cta-hover" style={{ ...btnPrimary, padding: "14px 28px", fontSize: 15 }} onClick={() => scrollToId("section-products")}>{t.heroCta} <ArrowRight size={16} style={{ [rtl ? "marginRight" : "marginLeft"]: 6, transform: rtl ? "rotate(180deg)" : "none" }} /></button>

                <div style={{ marginTop: 34 }}>
                  <span style={{ fontSize: 11.5, letterSpacing: 0.5, color: th.muted3, display: "block", marginBottom: 12 }}>{t.integrationsLabel}</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {[...INNER_TOOLS.slice(0, 5), ...OUTER_TOOLS.slice(0, 3)].map((tool, i) => (
                      <span key={i} className="integration-chip" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600, color: th.muted2, background: th.elevated, border: `1px solid ${th.borderStrong}`, borderRadius: 8, padding: "6px 10px" }}>
                        <tool.icon size={13} color={tool.color} /> {tool.label}
                      </span>
                    ))}
                    <span style={{ display: "inline-flex", alignItems: "center", fontSize: 12.5, fontWeight: 600, color: "#06B6D4", background: "#06B6D41A", borderRadius: 8, padding: "6px 10px" }}>
                      {t.moreTools}
                    </span>
                  </div>
                </div>
              </div>
              <div className="hero-diagram"><NetworkDiagram th={th} heroDraw={heroDraw} /></div>
            </div>

            <div style={{ marginTop: 50, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.7, animation: "pulse 2.2s ease-in-out infinite", position: "relative", zIndex: 2 }}>
              <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>{t.scroll}</span>
              <div style={{ width: 1, height: 34, background: "linear-gradient(#06B6D4,transparent)" }} />
            </div>
          </section>

          <section id="section-products" ref={railRef} style={{ padding: "30px 0 96px" }}>
            <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 26, flexWrap: "wrap", gap: 10 }}>
              <div><span style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#06B6D4" }}>{t.railEyebrow}</span><h2 className="display" style={{ fontSize: 26, fontWeight: 700, margin: "6px 0 6px" }}>{t.railTitle}</h2><p style={{ fontSize: 14, color: th.muted2, margin: 0, maxWidth: 420 }}>{t.railIntro}</p></div>
              <span style={{ fontSize: 13, color: th.muted3, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}><MousePointerClick size={14} /> {t.swipeHint}</span>
            </div>
            <div className="rail" style={{ display: "flex", gap: 20, overflowX: "auto", scrollSnapType: "x mandatory", padding: "8px 24px 20px", maxWidth: 1180, margin: "0 auto" }}>
              {featured.map((p, i) => <ProductCard key={p.id} p={p} i={i} inView={railIn} lang={lang} rtl={rtl} th={th} t={t} onOpen={() => setActive(p)} />)}
              <div style={{ scrollSnapAlign: "start", minWidth: 200, borderRadius: 18, border: `1px dashed ${th.borderStrong}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer", opacity: railIn ? 1 : 0, transform: railIn ? "translateY(0)" : "translateY(24px)", transition: "all .6s ease .5s" }} onClick={() => setView("catalog")}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#06B6D4)", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronRight size={20} color="#fff" style={{ transform: rtl ? "rotate(180deg)" : "none" }} /></div>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: th.muted }}>{t.viewAll}</span>
              </div>
            </div>
          </section>

          <section id="section-how" style={{ padding: "10px 24px 90px", maxWidth: 1180, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <span style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#06B6D4" }}>{t.howEyebrow}</span>
              <h2 className="display" style={{ fontSize: 26, fontWeight: 700, margin: "6px 0 0" }}>{t.howTitle}</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 26 }}>
              {t.howSteps.map((s, i) => (
                <div key={i} style={{ textAlign: "center", padding: "0 12px" }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: "#fff", fontSize: 18 }}>{i + 1}</div>
                  <h3 className="display" style={{ fontSize: 16.5, marginBottom: 8 }}>{s.t}</h3>
                  <p style={{ fontSize: 13.5, color: th.muted2, lineHeight: 1.6, margin: 0 }}>{s.d}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="section-why" style={{ padding: "10px 24px 96px", maxWidth: 1180, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 22 }}>
              {t.trust.map((f, i) => { const Icon = [Clock, Shield, Globe2, MousePointerClick][i]; return (
                <div key={i} className="card-hover" style={{ padding: 26, borderRadius: 16, background: th.elevated, border: `1px solid ${th.border}`, transition: "box-shadow .25s ease, border-color .25s ease, transform .25s ease" }}>
                  <Icon size={26} color="#06B6D4" />
                  <div style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: th.muted3, margin: "16px 0 2px" }}>{f.b}</div>
                  <h3 className="display" style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>{f.t}</h3>
                  <p style={{ fontSize: 13.5, color: th.muted2, lineHeight: 1.6, margin: 0 }}>{f.d}</p>
                </div>
              ); })}
            </div>
          </section>

          <ContactSection t={t} th={th} rtl={rtl} lang={lang} requestContext={requestContext} />

          <Footer t={t} th={th} rtl={rtl} openFaq={openFaq} setOpenFaq={setOpenFaq} />
        </>
      ) : (
        <CatalogView products={products} t={t} th={th} rtl={rtl} lang={lang} onBack={() => setView("home")} onOpen={(p) => setActive(p)} />
      )}
      </div>

      {active && <DetailDrawer product={active} lang={lang} rtl={rtl} th={th} t={t} onClose={() => setActive(null)} onRequest={() => { setRequestContext({ source: "Website — Product Drawer", product_id: active.id }); setView("home"); }} />}
    </div>
  );
}

/* ---------------------------------------------------------
   Network diagram — spider circuit, 15 tools around Taskless
--------------------------------------------------------- */
function NetworkDiagram({ th, heroDraw }) {
  const CX = 240, CY = 240, R1 = 118, R2 = 200;
  const inner = INNER_TOOLS.map((tool, i) => { const a = (Math.PI * 2 * i) / INNER_TOOLS.length - Math.PI / 2; return { ...tool, x: CX + R1 * Math.cos(a), y: CY + R1 * Math.sin(a) }; });
  const outer = OUTER_TOOLS.map((tool, j) => { const a = (Math.PI * 2 * j) / OUTER_TOOLS.length - Math.PI / 2; const nearest = inner[Math.round((j / OUTER_TOOLS.length) * inner.length) % inner.length]; return { ...tool, x: CX + R2 * Math.cos(a), y: CY + R2 * Math.sin(a), nearest }; });

  return (
    <div style={{ width: "100%", maxWidth: 460, margin: "0 auto" }}>
      <svg viewBox="0 0 480 480" style={{ width: "100%", height: "auto", overflow: "visible" }}>
        <defs>
          <linearGradient id="linegrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2563EB" /><stop offset="100%" stopColor="#06B6D4" /></linearGradient>
          <radialGradient id="hubglow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#06B6D4" stopOpacity="0.35" /><stop offset="100%" stopColor="#06B6D4" stopOpacity="0" /></radialGradient>
        </defs>
        <circle cx={CX} cy={CY} r={64} fill="url(#hubglow)" style={{ animation: "hubglow 3s ease-in-out infinite" }} />

        {/* outer web — faint circuit traces between adjacent outer nodes */}
        {outer.map((n, i) => { const nx = outer[(i + 1) % outer.length]; return <line key={`web-${i}`} x1={n.x} y1={n.y} x2={nx.x} y2={nx.y} stroke={th.borderStrong} strokeWidth="1" opacity="0.35" />; })}
        {/* branch lines: outer -> nearest inner */}
        {outer.map((n, i) => <line key={`branch-${i}`} x1={n.x} y1={n.y} x2={n.nearest.x} y2={n.nearest.y} stroke="url(#linegrad)" strokeWidth="1" opacity="0.22" />)}
        {/* spokes: hub -> inner, animated */}
        {inner.map((n, i) => (
          <path key={`spoke-${i}`} id={`spoke-${i}`} d={`M${CX},${CY} L${n.x},${n.y}`} stroke="url(#linegrad)" strokeWidth="1.6" opacity="0.5" fill="none" strokeDasharray="220" strokeDashoffset={heroDraw ? 0 : 220} style={{ transition: `stroke-dashoffset 1s ease ${0.12 * i}s` }} />
        ))}
        {inner.map((n, i) => (
          <circle key={`p-${i}`} r="3.2" fill="#06B6D4">
            <animateMotion dur={`${3 + i * 0.2}s`} repeatCount="indefinite" begin={`${i * 0.35}s`} keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="linear"><mpath href={`#spoke-${i}`} /></animateMotion>
          </circle>
        ))}

        <circle cx={CX} cy={CY} r="38" fill={th.elevated} stroke="url(#linegrad)" strokeWidth="1.8" />
        <foreignObject x={CX - 15} y={CY - 15} width="30" height="30"><TLogo size={30} /></foreignObject>

        {outer.map((n, i) => (
          <g key={`onode-${i}`} style={{ animation: `float ${4.5 + i * 0.25}s ease-in-out infinite`, animationDelay: `${i * 0.25}s`, transformOrigin: `${n.x}px ${n.y}px` }}>
            <circle cx={n.x} cy={n.y} r="21" fill={th.elevated} stroke={th.borderStrong} strokeWidth="1" />
            <foreignObject x={n.x - 10} y={n.y - 10} width="20" height="20"><div style={{ width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}><n.icon size={13} color={n.color} /></div></foreignObject>
            <text x={n.x} y={n.y + 34} textAnchor="middle" fontSize="8.5" fill={th.muted3} fontFamily="Inter, sans-serif">{n.label}</text>
          </g>
        ))}
        {inner.map((n, i) => (
          <g key={`inode-${i}`} style={{ animation: `float ${4 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.3}s`, transformOrigin: `${n.x}px ${n.y}px` }}>
            <circle cx={n.x} cy={n.y} r="25" fill={th.elevated} stroke={n.color} strokeWidth="1.3" />
            <foreignObject x={n.x - 12} y={n.y - 12} width="24" height="24"><div style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}><n.icon size={15} color={n.color} /></div></foreignObject>
            <text x={n.x} y={n.y + 40} textAnchor="middle" fontSize="9.5" fontWeight="600" fill={th.muted2} fontFamily="Inter, sans-serif">{n.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------
   Mini flow — customized per product
--------------------------------------------------------- */
function MiniFlow({ fromIcon: FromIcon, fromColor, toIcon: ToIcon, fromLabel, toLabel, th, automateLabel, viaText, size = "sm" }) {
  const h = size === "sm" ? 56 : 68;
  const nodes = [{ Icon: FromIcon, c: fromColor, label: fromLabel }, { Icon: Sparkles, c: "#8B5CF6", label: automateLabel }, { Icon: ToIcon, c: "#06B6D4", label: toLabel }];
  const xs = [18, 100, 182];
  const uid = fromColor.replace("#", "") + (ToIcon.displayName || "o");
  return (
    <div>
      <svg viewBox="0 0 200 56" style={{ width: "100%", maxWidth: 200, height: h, display: "block" }}>
        <defs><linearGradient id={`mfg-${uid}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={fromColor} /><stop offset="100%" stopColor="#06B6D4" /></linearGradient></defs>
        <path id={`mfpath-${uid}`} d={`M${xs[0]},20 L${xs[2]},20`} stroke={`url(#mfg-${uid})`} strokeWidth="1.4" opacity="0.5" />
        <circle r="2.6" fill="#06B6D4"><animateMotion dur="2.6s" repeatCount="indefinite"><mpath href={`#mfpath-${uid}`} /></animateMotion></circle>
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={xs[i]} cy={20} r="16" fill={`${n.c}1F`} stroke={`${n.c}55`} />
            <foreignObject x={xs[i] - 8} y={12} width="16" height="16"><div style={{ width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}><n.Icon size={12} color={n.c} /></div></foreignObject>
            <text x={xs[i]} y={46} textAnchor="middle" fontSize="7.5" fill={th.muted3}>{n.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------
   Small components
--------------------------------------------------------- */
function TLogo({ size = 26 }) {
  return <svg width={size} height={size} viewBox="0 0 40 40"><defs><linearGradient id="tgradnav" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2563EB" /><stop offset="100%" stopColor="#06B6D4" /></linearGradient></defs><path d="M6 8 H34 M20 8 V32 Q20 36 24 34" stroke="url(#tgradnav)" strokeWidth="5" fill="none" strokeLinecap="round" /></svg>;
}
function IconToggle({ children, onClick, th, label, wide }) {
  return <button onClick={onClick} aria-label={label} title={label} style={{ background: th.elevated, border: `1px solid ${th.borderStrong}`, color: th.text, borderRadius: 10, padding: wide ? "8px 12px" : "8px", gap: 5, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>{children}</button>;
}
function ProductCard({ p, i, inView, lang, rtl, th, t, onOpen }) {
  const color = SEGMENT_COLORS[p.seg]; const d = p[lang]; const Icon = p.icon;
  return (
    <div className="card card-hover" style={{ scrollSnapAlign: "start", minWidth: 264, maxWidth: 264, borderRadius: 18, padding: 22, background: th.elevated, border: `1px solid ${th.border}`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0) scale(1)" : "translateY(28px) scale(0.96)", transition: `opacity .6s cubic-bezier(.22,1,.36,1) ${i * 0.12}s, transform .6s cubic-bezier(.22,1,.36,1) ${i * 0.12}s, box-shadow .25s ease, border-color .25s ease` }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: color }} /><span style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: th.muted3 }}>{t.segLabels[p.seg]}</span></div>
        <span style={{ fontSize: 10.5, fontWeight: 600, color: "#06B6D4", background: "#06B6D41A", borderRadius: 6, padding: "2px 7px" }}>{deliveryLabel(p.id, t)}</span>
      </div>
      <h3 className="display" style={{ fontSize: 17.5, fontWeight: 700, margin: "0 0 8px" }}>{d.name}</h3>
      <p style={{ fontSize: 13, color: th.muted2, lineHeight: 1.5, minHeight: 40, margin: "0 0 10px" }}>{d.hook}</p>
      <MiniFlow fromIcon={Icon} fromColor={color} toIcon={p.outIcon} fromLabel={d.inLabel} toLabel={d.outLabel} th={th} automateLabel={t.automateLabel} />
      <button onClick={onOpen} style={{ background: "none", border: "none", color, fontSize: 13.5, fontWeight: 600, cursor: "pointer", gap: 4, padding: 0, marginTop: 10 }}>{t.seeMore} <ArrowRight size={14} style={{ transform: rtl ? "rotate(180deg)" : "none" }} /></button>
    </div>
  );
}
function DetailDrawer({ product, lang, rtl, th, t, onClose, onRequest }) {
  const color = SEGMENT_COLORS[product.seg]; const d = product[lang]; const Icon = product.icon;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: th.overlay, backdropFilter: "blur(3px)" }} />
      <div style={{ position: "relative", width: "100%", maxWidth: 560, maxHeight: "88vh", overflowY: "auto", background: th.elevated, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: "32px 28px 40px", border: `1px solid ${th.border}`, animation: "slideup .35s ease", textAlign: rtl ? "right" : "left" }}>
        <button onClick={onClose} aria-label="Close" style={{ position: "absolute", top: 20, [rtl ? "left" : "right"]: 20, background: "none", border: "none", color: th.muted2, cursor: "pointer" }}><X size={22} /></button>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}><Icon size={22} color={color} /></div>
        <span style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color }}>{t.segLabels[product.seg]}</span>
        <h2 className="display" style={{ fontSize: 24, fontWeight: 700, margin: "8px 0 18px" }}>{d.name}</h2>
        <div style={{ marginBottom: 22, padding: "18px 4px", borderTop: `1px solid ${th.border}`, borderBottom: `1px solid ${th.border}` }}>
          <MiniFlow fromIcon={Icon} fromColor={color} toIcon={product.outIcon} fromLabel={d.inLabel} toLabel={d.outLabel} th={th} automateLabel={t.automateLabel} size="lg" />
        </div>
        <Block label={t.drawer.before} text={d.before} th={th} />
        <Block label={t.drawer.after} text={d.after} color={color} th={th} />
        <Block label={t.drawer.need} text={d.need} th={th} />
        <button className="cta-hover" style={{ ...btnPrimary, width: "100%", marginTop: 12, justifyContent: "center" }} onClick={() => { onRequest(); onClose(); setTimeout(() => scrollToId("section-contact"), 150); }}>{t.drawer.cta} <ArrowRight size={16} style={{ [rtl ? "marginRight" : "marginLeft"]: 6, transform: rtl ? "rotate(180deg)" : "none" }} /></button>
      </div>
    </div>
  );
}
function Block({ label, text, color, th }) {
  return <div style={{ marginBottom: 20 }}><div style={{ fontSize: 12, letterSpacing: 0.5, color: color || th.muted2, fontWeight: 600, marginBottom: 6 }}>{label}</div><p style={{ fontSize: 14.5, lineHeight: 1.6, color: th.muted, margin: 0 }}>{text}</p></div>;
}
function CatalogView({ products, t, th, rtl, lang, onBack, onOpen }) {
  const [query, setQuery] = useState("");
  const [activeSeg, setActiveSeg] = useState("all");
  const segments = ["all", "business", "creators", "students", "parents", "health"];
  const filtered = products.filter((p) => {
    const d = p[lang];
    const matchesSeg = activeSeg === "all" || p.seg === activeSeg;
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || d.name.toLowerCase().includes(q) || d.hook.toLowerCase().includes(q);
    return matchesSeg && matchesQuery;
  });
  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 24px 100px", textAlign: rtl ? "right" : "left" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#06B6D4", fontSize: 14, cursor: "pointer", marginBottom: 24, gap: 6 }}>{rtl ? "→" : "←"} {t.back}</button>
      <h2 className="display" style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>{t.catalogTitle}</h2>
      <p style={{ color: th.muted2, marginBottom: 24 }}>{t.catalogSub}</p>

      <div style={{ position: "relative", marginBottom: 18, maxWidth: 420 }}>
        <input placeholder={t.searchPh} value={query} onChange={(e) => setQuery(e.target.value)}
          style={{ width: "100%", border: `1px solid ${th.borderStrong}`, borderRadius: 10, padding: "11px 14px", fontSize: 14, background: th.elevated, color: th.text, fontFamily: "inherit" }} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 30 }}>
        {segments.map((s) => (
          <button key={s} className="filter-pill" onClick={() => setActiveSeg(s)} style={{
            border: `1px solid ${activeSeg === s ? "#06B6D4" : th.borderStrong}`,
            background: activeSeg === s ? "#06B6D41A" : th.elevated,
            color: activeSeg === s ? "#06B6D4" : th.muted2,
            borderRadius: 20, padding: "7px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>{s === "all" ? t.allCategories : t.segLabels[s]}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: th.muted3, fontSize: 14, padding: "40px 0", textAlign: "center" }}>
          {rtl ? "لا توجد نتائج مطابقة." : "No workflows match that search."}
        </p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 18 }}>
          {filtered.map((p) => { const d = p[lang]; const color = SEGMENT_COLORS[p.seg]; const Icon = p.icon; return (
            <div key={p.id} className="card-hover" style={{ borderRadius: 16, padding: 20, background: th.elevated, border: `1px solid ${th.border}`, transition: "box-shadow .25s ease, border-color .25s ease, transform .25s ease" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: color }} /><span style={{ fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", color: th.muted3 }}>{t.segLabels[p.seg]}</span></div>
                <span style={{ fontSize: 10, fontWeight: 600, color: "#06B6D4", background: "#06B6D41A", borderRadius: 6, padding: "2px 6px" }}>{deliveryLabel(p.id, t)}</span>
              </div>
              <h3 className="display" style={{ fontSize: 16, fontWeight: 700, margin: "0 0 6px" }}>{d.name}</h3>
              <p style={{ fontSize: 12.5, color: th.muted2, lineHeight: 1.5, minHeight: 36, margin: "0 0 10px" }}>{d.hook}</p>
              <MiniFlow fromIcon={Icon} fromColor={color} toIcon={p.outIcon} fromLabel={d.inLabel} toLabel={d.outLabel} th={th} automateLabel={t.automateLabel} />
              <button onClick={() => onOpen(p)} style={{ background: "none", border: "none", color, fontSize: 12.5, fontWeight: 600, cursor: "pointer", padding: 0, marginTop: 8 }}>{t.seeMore} →</button>
            </div>
          ); })}
        </div>
      )}
    </div>
  );
}
function ContactSection({ t, th, rtl, lang, requestContext }) {
  const [form, setForm] = useState({ name: "", mobile: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = () => {
    if (!form.name.trim() || !form.mobile.trim() || !form.message.trim()) { setError(true); return; }
    setError(false); setSent(true);
    const payload = { ...form, source: requestContext.source, product_id: requestContext.product_id, language: lang };
    if (!REQUESTS_API.startsWith("REPLACE_WITH")) {
      // Content-Type: text/plain is deliberate — it keeps this a CORS "simple request"
      // (no preflight), which Apps Script web apps can't reliably answer. The body is
      // still valid JSON; doPost on the other end parses it as JSON regardless.
      fetch(REQUESTS_API, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      }).catch((err) => console.error("Request submission failed:", err));
    }
  };
  const reset = () => { setForm({ name: "", mobile: "", email: "", message: "" }); setSent(false); setError(false); };
  return (
    <section id="section-contact" style={{ padding: "10px 24px 100px", maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
      <h2 className="display" style={{ fontSize: 28, fontWeight: 700, marginBottom: 10 }}>{t.inquiryTitle}</h2>
      <p style={{ color: th.muted2, marginBottom: 22 }}>{t.inquirySub}</p>
      <div style={{ background: th.elevated, border: `1px solid ${th.border}`, borderRadius: 12, padding: "14px 18px", marginBottom: 30, textAlign: rtl ? "right" : "left" }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{t.pricingTitle}</div>
        <div style={{ fontSize: 12.5, color: th.muted2, lineHeight: 1.6 }}>{t.pricingBody}</div>
      </div>
      {sent ? (
        <div style={{ borderRadius: 16, background: th.elevated, border: `1px solid ${th.border}`, padding: "32px 24px", animation: "popin .4s ease" }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#25D36622", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}><Check size={22} color="#25D366" /></div>
          <h3 className="display" style={{ fontSize: 18, marginBottom: 6 }}>{t.successTitle}</h3>
          <p style={{ fontSize: 14, color: th.muted2, marginBottom: 20 }}>{t.successBody}</p>
          <button onClick={reset} style={{ background: "none", border: `1px solid ${th.borderStrong}`, color: th.text, borderRadius: 10, padding: "9px 18px", fontSize: 13.5, cursor: "pointer" }}>{t.sendAnother}</button>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 14, textAlign: rtl ? "right" : "left" }}>
          <input placeholder={t.namePh} value={form.name} onChange={set("name")} style={{ ...inputStyle, background: th.elevated, borderColor: th.borderStrong, color: th.text }} />
          <input placeholder={t.mobilePh} value={form.mobile} onChange={set("mobile")} style={{ ...inputStyle, background: th.elevated, borderColor: th.borderStrong, color: th.text }} />
          <input placeholder={t.emailPh} type="email" value={form.email} onChange={set("email")} style={{ ...inputStyle, background: th.elevated, borderColor: th.borderStrong, color: th.text }} />
          <textarea placeholder={t.descPh} rows={3} value={form.message} onChange={set("message")} style={{ ...inputStyle, background: th.elevated, borderColor: th.borderStrong, color: th.text, resize: "vertical" }} />
          {error && <span style={{ fontSize: 13, color: th.danger }}>{t.formError}</span>}
          <button className="cta-hover" onClick={submit} style={{ ...btnPrimary, justifySelf: rtl ? "end" : "start", marginTop: 4 }}>{t.send} <Send size={15} style={{ [rtl ? "marginRight" : "marginLeft"]: 6 }} /></button>
        </div>
      )}
    </section>
  );
}
function Footer({ t, th, rtl, openFaq, setOpenFaq }) {
  return (
    <footer id="section-faq" style={{ borderTop: `1px solid ${th.border}`, padding: "52px 24px 32px" }}>
      <div className="footer-grid" style={{ maxWidth: 1180, margin: "0 auto", textAlign: rtl ? "right" : "left" }}>
        <div><h3 className="display" style={{ fontSize: 18, marginBottom: 10 }}>Taskless</h3><p style={{ fontSize: 13.5, color: th.muted2, lineHeight: 1.6, maxWidth: 320 }}>{t.footAbout}</p><div style={{ display: "flex", gap: 14, marginTop: 20 }}><Instagram size={18} color={th.muted3} /><Linkedin size={18} color={th.muted3} /></div></div>
        <div>
          <h4 style={{ fontSize: 13, letterSpacing: 1, textTransform: "uppercase", color: th.muted3, marginBottom: 16 }}>{t.faqTitle}</h4>
          {t.faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: `1px solid ${th.border}` }}>
              <button className="faq-btn" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} style={{ width: "100%", background: "none", border: "none", color: th.text, textAlign: rtl ? "right" : "left", padding: "12px 0", justifyContent: "space-between", cursor: "pointer", fontSize: 14 }}>{f.q} {openFaq === i ? <Minus size={15} /> : <Plus size={15} />}</button>
              {openFaq === i && <p style={{ fontSize: 13, color: th.muted2, lineHeight: 1.6, margin: "0 0 14px" }}>{f.a}</p>}
            </div>
          ))}
        </div>
        <div>
          <h4 style={{ fontSize: 13, letterSpacing: 1, textTransform: "uppercase", color: th.muted3, marginBottom: 16 }}>{t.legalTitle}</h4>
          <div style={{ fontSize: 13.5, color: th.muted2, lineHeight: 2.2 }}>
            <div>{t.privacy}</div>
            <div>{t.terms}</div>
          </div>
        </div>
      </div>
      <p style={{ textAlign: "center", fontSize: 12.5, color: th.muted2, marginTop: 44, fontStyle: "italic" }}>{t.footBrandLine}</p>
      <p style={{ textAlign: "center", fontSize: 12, color: th.muted3, marginTop: 8 }}>{t.tagline}</p>
      <p style={{ textAlign: "center", fontSize: 11.5, color: th.muted3, marginTop: 14, paddingTop: 14, borderTop: `1px solid ${th.border}`, maxWidth: 300, marginLeft: "auto", marginRight: "auto" }}>{t.copyright}</p>
    </footer>
  );
}
const btnPrimary = { background: "linear-gradient(90deg,#2563EB,#06B6D4)", color: "#fff", border: "none", borderRadius: 10, padding: "11px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer" };
const inputStyle = { border: "1px solid", borderRadius: 10, padding: "12px 14px", fontSize: 14, fontFamily: "inherit" };
