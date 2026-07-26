import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  ArrowRight, X, Shield, Globe2, Clock, MousePointerClick, Send, Plus, Minus,
  Instagram, Linkedin, ChevronRight, Sun, Moon, Languages, Menu, Check,
  MessageCircle, Receipt, BarChart3, CalendarClock, Star, Sparkles, Share2,
  Newspaper, CalendarDays, Handshake, Bell, FileSearch, Timer, Mail,
  ClipboardCheck, CalendarCheck2, Wallet, Pill, ClipboardList, Camera,
  Activity, Droplet, LineChart, Phone, Grid3x3, Bot, FileText, LayoutGrid,
  Palette, Hash, FileSpreadsheet, Presentation, Inbox, Utensils,
  MapPin, UserPlus, Mic, Building2, User,
} from "lucide-react";

/* ---------------------------------------------------------
   THEME
--------------------------------------------------------- */
const THEMES = {
  dark: { bg: "#0D1117", elevated: "#131822", text: "#F5F7FA", muted: "#A6B0C0", muted2: "#8892A0", muted3: "#6B7686", border: "rgba(255,255,255,0.07)", borderStrong: "#2A3242", orb1: "#2563EB55", orb2: "#06B6D455", overlay: "rgba(5,7,11,0.72)", dot: "rgba(255,255,255,0.05)", danger: "#F87171" },
  light: { bg: "#F3F5F8", elevated: "#FFFFFF", text: "#0D1117", muted: "#3F4756", muted2: "#5B6472", muted3: "#7C8494", border: "rgba(13,17,23,0.08)", borderStrong: "#DCE1E8", orb1: "#2563EB2E", orb2: "#06B6D42E", overlay: "rgba(240,242,246,0.78)", dot: "rgba(13,17,23,0.05)", danger: "#DC2626" },
};
const CATEGORY_COLORS = { sales: "#2563EB", ops: "#F59E0B", cx: "#EC4899", people: "#7C3AED", personal: "#10B981" };

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
    cta: "Get in touch",
    categoryLabels: { sales: "Sales & Growth", ops: "Operations & Finance", cx: "Customer Experience", people: "People & Projects", personal: "Personal Productivity & Wellbeing" },
    audienceLabels: { business: "Business", individual: "Individual" },
    menu: { home: "Home", products: "Products", how: "How it works", why: "Why Taskless", contact: "Get in touch", faq: "FAQ" },
    heroBadge: "Automation, connected", heroLine1: "Your to-do list", heroLine2: "just disappeared.",
    heroSub: "We connect the tools you already use into AI-powered workflows that eliminate repetitive work, cut mistakes, and save hours every week — delivered in 48 hours, no coding required.",
    heroCta: "Browse Workflows", scroll: "Scroll",
    integrationsLabel: "Works with the tools you already use", moreTools: "+ 7 more",
    railEyebrow: "Popular Workflows", railTitle: "Ready-to-use automations", railIntro: "Each one solves a repetitive problem a real business runs into every week.", swipeHint: "swipe to browse", viewAll: "View all 20", seeMore: "View Workflow",
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
    bestForLabel: "Best for", deliverablesTitle: "How you receive this",
    transferTitle: "Transfer (one-time)", transferBody: "Workflow file, documentation, and testing — you own and host it after handover. No ongoing support included.",
    hostedTitle: "Hosted & Managed (recurring)", hostedBody: "Workflow, documentation, testing, a training session, and ongoing support included in the monthly fee.",
    customizableNote: "Every workflow can be customized to fit your exact process.",
    catalogTitle: "All workflows", catalogSub: "20 workflows — search or filter by category to find yours.", back: "Back",
    searchPh: "Search workflows...", allCategories: "All",
  },
  ar: {
    cta: "تواصل معنا",
    categoryLabels: { sales: "المبيعات والنمو", ops: "العمليات والمالية", cx: "تجربة العملاء", people: "الأفراد والمشاريع", personal: "الإنتاجية الشخصية والعافية" },
    audienceLabels: { business: "أعمال", individual: "فردي" },
    menu: { home: "الرئيسية", products: "الخدمات", how: "كيف نعمل", why: "لماذا Taskless", contact: "تواصل معنا", faq: "الأسئلة الشائعة" },
    heroBadge: "أتمتة متصلة", heroLine1: "قائمة مهامك", heroLine2: "اختفت للتو.",
    heroSub: "نربط الأدوات التي تستخدمها فعلاً في أتمتة مدعومة بالذكاء الاصطناعي تُلغي العمل المتكرر، تقلل الأخطاء، وتوفر ساعات كل أسبوع — تُسلَّم خلال 48 ساعة، بلا برمجة.",
    heroCta: "تصفح الأتمتة", scroll: "مرر للأسفل",
    integrationsLabel: "يعمل مع الأدوات التي تستخدمها فعلاً", moreTools: "+ 7 أدوات أخرى",
    railEyebrow: "الأتمتة الأكثر طلباً", railTitle: "أتمتة جاهزة للاستخدام", railIntro: "كل واحدة تحل مشكلة متكررة يواجهها أي عمل كل أسبوع.", swipeHint: "اسحب للتصفح", viewAll: "عرض الكل (20)", seeMore: "عرض الأتمتة",
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
    bestForLabel: "الأنسب لـ", deliverablesTitle: "كيف تستلم هذه الأتمتة",
    transferTitle: "نقل الملكية (دفعة واحدة)", transferBody: "ملف الأتمتة والتوثيق والاختبار — تملكها وتستضيفها بعد التسليم. بلا دعم مستمر.",
    hostedTitle: "استضافة وإدارة (اشتراك شهري)", hostedBody: "الأتمتة، التوثيق، الاختبار، جلسة تدريب، ودعم مستمر ضمن الاشتراك الشهري.",
    customizableNote: "يمكن تخصيص كل أتمتة لتناسب عمليتك بالضبط.",
    catalogTitle: "كل الأتمتة", catalogSub: "20 أتمتة — ابحث أو صفّ حسب الفئة لتجد ما يناسبك.", back: "رجوع",
    searchPh: "ابحث في الأتمتة...", allCategories: "الكل",
  },
};

/* ---------------------------------------------------------
   PRODUCTS — 20 workflows across 5 functional categories.
   audience is derived from category (personal => individual), not
   hand-set per item, since the mapping is currently exact.
--------------------------------------------------------- */
const FALLBACK_PRODUCTS = [
  { id: "SG1", category: "sales", icon: Globe2, outIcon: MessageCircle, en: { name: "Lead Capture", hook: "Someone fills out your form. You're on WhatsApp within seconds — before they've even closed the tab.", before: "A lead fills your contact form at 11pm. You see it two days later, buried in an inbox you check once a week. By the time you reply, they've already booked with someone else.", after: "The same lead fills the form. Your phone buzzes in seconds — name, number, and what they need, sitting in WhatsApp. You reply while they're still thinking about you.", need: "Access to your existing form (or we build one for you) · The WhatsApp number that should receive alerts · Where you want the lead saved.", inLabel: "Form submitted", outLabel: "WhatsApp + CRM", bestFor: ["Real Estate", "Clinics", "Agencies", "Retail"] }, ar: { name: "التقاط العملاء المحتملين", hook: "شخص يملأ نموذجك. تصلك رسالة واتساب خلال ثوانٍ — قبل أن يغلق حتى التبويب.", before: "عميل محتمل يملأ نموذج التواصل الساعة 11 مساءً. تراه بعد يومين، مدفوناً في بريد تفتحه مرة أسبوعياً. وبحلول وقت ردك، يكون قد حجز مع منافس.", after: "نفس العميل يملأ النموذج. هاتفك يهتز خلال ثوانٍ — الاسم، الرقم، وما يحتاجه، على واتساب مباشرة. ترد وهو لا يزال يفكر بك.", need: "الوصول لنموذجك الحالي (أو نبنيه لك) · رقم الواتساب المستلم للتنبيهات · مكان حفظ بيانات العميل.", inLabel: "تم إرسال النموذج", outLabel: "واتساب + CRM", bestFor: ["عقارات", "عيادات", "وكالات", "تجزئة"] } },
  { id: "SG2", category: "sales", icon: MapPin, outIcon: ClipboardList, en: { name: "Lead Generation via Google Maps", hook: "Tell us your ideal customer's neighborhood and business type. We hand you a ready list, contact details included.", before: "You want to reach every clinic in a certain area, but building that list means hours of manual searching, copying names, and guessing which numbers are current.", after: "You tell us the area and business type once. A clean, ready-to-use list lands in your Sheet — no browser tabs, no copy-paste.", need: "The type of business you're targeting · The city or district · How often you'd like the list refreshed.", inLabel: "Area + business type", outLabel: "Ready contact list", bestFor: ["Sales Teams", "Agencies", "B2B Services"] }, ar: { name: "توليد العملاء المحتملين عبر خرائط جوجل", hook: "أخبرنا بمنطقة عميلك المثالي ونوع نشاطه. نسلّمك قائمة جاهزة، مع بيانات التواصل.", before: "تريد الوصول لكل عيادة في منطقة معينة، لكن بناء هذه القائمة يعني ساعات من البحث اليدوي ونسخ الأسماء وتخمين الأرقام الصحيحة.", after: "تخبرنا بالمنطقة والنوع مرة واحدة. قائمة جاهزة ونظيفة تصل جدولك — بلا تبويبات متصفح، بلا نسخ ولصق.", need: "نوع النشاط المستهدف · المدينة أو الحي · عدد مرات تحديث القائمة.", inLabel: "المنطقة والنوع", outLabel: "قائمة تواصل جاهزة", bestFor: ["فرق المبيعات", "وكالات", "خدمات B2B"] } },
  { id: "SG3", category: "sales", icon: UserPlus, outIcon: ClipboardCheck, en: { name: "Customer Onboarding Automation", hook: "A new client signs. They get a personalized checklist automatically — no chasing, no forgotten steps.", before: "You close a deal, and then onboarding becomes a scattered thread of 'did you send that?' messages across WhatsApp, email, and memory.", after: "The moment a client signs, they receive a clear checklist built just for them — and you get a nudge the moment something's missing on their end.", need: "Your typical onboarding steps · Where new client info currently lives · The WhatsApp number(s) that should receive nudges.", inLabel: "Client signs", outLabel: "Onboarding checklist", bestFor: ["Agencies", "Consultancies", "SaaS", "Professional Services"] }, ar: { name: "أتمتة تهيئة العملاء", hook: "عميل جديد يوقع. يستلم قائمة تحقق مخصصة تلقائياً — بلا متابعة، بلا خطوات منسية.", before: "تُغلق الصفقة، ثم تتحول التهيئة إلى سلسلة رسائل متناثرة 'هل أرسلت ذلك؟' عبر واتساب والبريد والذاكرة.", after: "لحظة توقيع العميل، يستلم قائمة تحقق واضحة مبنية له خصيصاً — وتصلك أنت تنبيهاً عند نقص أي شيء من جانبه.", need: "خطوات التهيئة المعتادة لديك · مكان بيانات العملاء الجدد حالياً · رقم/أرقام واتساب استلام التنبيهات.", inLabel: "توقيع العميل", outLabel: "قائمة تحقق", bestFor: ["وكالات", "استشارات", "SaaS", "خدمات مهنية"] } },
  { id: "SG4", category: "sales", icon: CalendarDays, outIcon: CalendarCheck2, en: { name: "Appointment Booking Assistant", hook: "Clients book their own slot. Confirmations and reminders go out automatically, on both sides.", before: "Booking a slot means back-and-forth messages to find a time that works, then hoping someone remembers to write it down before it's forgotten or double-booked.", after: "A client picks an open slot themselves. Both sides get an instant confirmation, and a reminder lands before the appointment — no back-and-forth, no double-booking.", need: "Your available hours/calendar · The booking details you need from clients · WhatsApp numbers for confirmations and reminders.", inLabel: "Slot requested", outLabel: "Confirmed + reminded", bestFor: ["Clinics", "Salons", "Consultants", "Real Estate"] }, ar: { name: "مساعد حجز المواعيد", hook: "العملاء يحجزون موعدهم بأنفسهم. التأكيدات والتذكيرات تُرسل تلقائياً للطرفين.", before: "حجز موعد يعني رسائل متبادلة للاتفاق على وقت مناسب، ثم الأمل أن يتذكر أحدهم تدوينه قبل أن يُنسى أو يتكرر حجزه.", after: "العميل يختار موعداً متاحاً بنفسه. يستلم الطرفان تأكيداً فورياً، وتذكيراً قبل الموعد — بلا رسائل متبادلة، بلا تكرار حجز.", need: "أوقاتك المتاحة/تقويمك · تفاصيل الحجز المطلوبة من العملاء · أرقام واتساب للتأكيد والتذكير.", inLabel: "طلب حجز", outLabel: "تأكيد وتذكير", bestFor: ["عيادات", "صالونات", "استشاريون", "عقارات"] } },
  { id: "SG5", category: "sales", icon: FileText, outIcon: Send, en: { name: "Proposal & Quotation Generator", hook: "A client describes what they need. A professional proposal or quote is generated and sent — no manual drafting.", before: "Every quote starts from a blank document — pulling numbers from memory, formatting it to look presentable, then sending it hours later than you meant to.", after: "A client's request comes in. A branded, professional proposal is generated with the right numbers already in place, and sent before the conversation goes cold.", need: "Your pricing structure or rate card · A proposal template or brand details · Where client requests currently come in.", inLabel: "Request received", outLabel: "Proposal sent", bestFor: ["Agencies", "Contractors", "Consultants", "B2B Sales"] }, ar: { name: "مولّد العروض وعروض الأسعار", hook: "العميل يصف ما يحتاجه. عرض سعر أو مقترح احترافي يُنشأ ويُرسل — بلا صياغة يدوية.", before: "كل عرض سعر يبدأ من صفحة فارغة — استحضار الأرقام من الذاكرة، تنسيقها لتبدو مقبولة، ثم إرسالها بعد ساعات أكثر مما قصدت.", after: "طلب العميل يصل. عرض احترافي يحمل هويتك يُنشأ بالأرقام الصحيحة جاهزة، ويُرسل قبل أن يبرد الحديث.", need: "هيكل تسعيرك · قالب العرض أو تفاصيل هويتك · مصدر وصول طلبات العملاء حالياً.", inLabel: "استلام الطلب", outLabel: "إرسال العرض", bestFor: ["وكالات", "مقاولون", "استشاريون", "مبيعات B2B"] } },
  { id: "OF1", category: "ops", icon: Camera, outIcon: Grid3x3, en: { name: "AI Expense Extraction", hook: "Photograph a receipt, or forward an invoice. The numbers land in your sheet — categorized, on their own.", before: "End of month, and you're sitting with a shoebox of receipts and a stack of invoice emails, typing every line into a spreadsheet by hand.", after: "A photo sent to WhatsApp, or an invoice forwarded to an inbox — either way, the expense appears in your sheet already categorized, ready for your accountant.", need: "The WhatsApp number or email address you'll send receipts/invoices to · Your expense categories · Access to the Google Sheet where expenses should land.", inLabel: "Receipt / invoice", outLabel: "Logged & categorized", bestFor: ["SMEs", "Restaurants", "Trading", "Any business with receipts"] }, ar: { name: "استخراج المصاريف بالذكاء الاصطناعي", hook: "صوّر إيصالاً، أو مرّر فاتورة. الأرقام تصل جدولك — مصنّفة، من تلقاء نفسها.", before: "نهاية الشهر، وأنت أمام علبة إيصالات وركام رسائل فواتير، تكتب كل سطر يدوياً في جدول بيانات.", after: "صورة تُرسل لواتساب، أو فاتورة تُمرّر لبريد إلكتروني — بأي طريقة، المصروف يظهر في جدولك مصنّفاً، جاهزاً لمحاسبك.", need: "رقم الواتساب أو البريد لاستقبال الإيصالات/الفواتير · فئات مصاريفك · الوصول لجدول جوجل المستهدف.", inLabel: "إيصال / فاتورة", outLabel: "مسجّل ومصنّف", bestFor: ["شركات صغيرة", "مطاعم", "تجارة", "أي عمل فيه إيصالات"] } },
  { id: "OF2", category: "ops", icon: Grid3x3, outIcon: Mail, en: { name: "AI-Generated PDF Invoices", hook: "Add a row to your sheet. A branded, professional invoice is generated and emailed — done.", before: "Every invoice means opening a template, manually filling in client details, calculating totals, exporting to PDF, then remembering to actually send it.", after: "You add one row to a sheet. A polished, branded invoice appears as a PDF in the client's inbox — automatically.", need: "Your invoice template or brand details · The Google Sheet structure you'd like to use · Client email addresses in your records.", inLabel: "Row added", outLabel: "PDF invoice emailed", bestFor: ["Freelancers", "SMEs", "Agencies", "Trading"] }, ar: { name: "فواتير PDF تلقائية", hook: "أضف صفاً في جدولك. فاتورة احترافية بهويتك تُنشأ وتُرسل بالبريد — انتهى الأمر.", before: "كل فاتورة تعني فتح قالب، تعبئة بيانات العميل يدوياً، حساب الإجمالي، تصديرها PDF، ثم تذكّر إرسالها فعلياً.", after: "تضيف صفاً واحداً في الجدول. فاتورة أنيقة بهويتك تظهر كملف PDF في بريد العميل — تلقائياً.", need: "قالب فاتورتك أو تفاصيل هويتك · هيكل جدول جوجل الذي تريده · عناوين بريد عملائك.", inLabel: "إضافة صف", outLabel: "فاتورة PDF بالبريد", bestFor: ["مستقلون", "شركات صغيرة", "وكالات", "تجارة"] } },
  { id: "OF3", category: "ops", icon: CalendarClock, outIcon: Bell, en: { name: "Invoice & Payment Reminder", hook: "Invoices go out, and follow-ups before and after the due date happen without you tracking a single one.", before: "Chasing late payments means remembering which invoice was sent when, then writing an awkward follow-up message yourself — or letting it slide because you forgot.", after: "Every invoice gets a gentle reminder before it's due, and a firmer one if it's late — automatically, without you checking a single date.", need: "Where your invoices and due dates are tracked · The tone/wording you'd like for reminders · WhatsApp or email for sending them.", inLabel: "Due date approaching", outLabel: "Reminder sent", bestFor: ["SMEs", "Agencies", "Freelancers", "Trading"] }, ar: { name: "تذكير الفواتير والمدفوعات", hook: "الفواتير تُرسل، والمتابعات قبل وبعد تاريخ الاستحقاق تحدث دون أن تتابع أي واحدة بنفسك.", before: "متابعة المدفوعات المتأخرة تعني تذكّر أي فاتورة أُرسلت ومتى، ثم كتابة رسالة متابعة محرجة بنفسك — أو تجاهلها لأنك نسيت.", after: "كل فاتورة تستلم تذكيراً لطيفاً قبل استحقاقها، وآخر أكثر حزماً إن تأخرت — تلقائياً، دون أن تراجع تاريخاً بنفسك.", need: "مكان تتبع فواتيرك وتواريخ استحقاقها · النبرة/الصياغة المفضلة للتذكيرات · واتساب أو بريد للإرسال.", inLabel: "اقتراب الاستحقاق", outLabel: "إرسال تذكير", bestFor: ["شركات صغيرة", "وكالات", "مستقلون", "تجارة"] } },
  { id: "OF4", category: "ops", icon: BarChart3, outIcon: Newspaper, en: { name: "Daily Business Report", hook: "8am. One WhatsApp message tells you exactly how yesterday went — sales, leads, operations, finance, pending approvals, and anything critical.", before: "You have no real read on yesterday until you personally call around or dig through three different systems.", after: "You wake up to one WhatsApp message covering every part of the business that needs your attention — before your first coffee.", need: "Where your daily data lives · What matters most to you in a morning snapshot · The WhatsApp number that should receive it.", inLabel: "Yesterday's data", outLabel: "8am summary", bestFor: ["Owners", "Operations Managers", "Multi-branch businesses"] }, ar: { name: "التقرير اليومي للأعمال", hook: "الساعة 8 صباحاً. رسالة واتساب واحدة تخبرك بالضبط كيف سار الأمس — المبيعات، العملاء، العمليات، المالية، الموافقات المعلقة، وأي أمر حرج.", before: "لا رؤية حقيقية لديك عن الأمس حتى تتصل بنفسك أو تبحث في ثلاثة أنظمة مختلفة.", after: "تستيقظ على رسالة واتساب واحدة تغطي كل جزء من العمل يحتاج انتباهك — قبل فنجان قهوتك الأول.", need: "مكان بياناتك اليومية · ما يهمك أكثر في لمحة صباحية · رقم واتساب الاستلام.", inLabel: "بيانات الأمس", outLabel: "ملخص 8 صباحاً", bestFor: ["الملّاك", "مدراء العمليات", "أعمال متعددة الفروع"] } },
  { id: "OF5", category: "ops", icon: FileSearch, outIcon: Check, en: { name: "Approval Routing Engine", hook: "A request — leave, purchase, or otherwise — gets routed to the right approver automatically, and everyone's notified the moment it's decided.", before: "An approval request means chasing someone on WhatsApp, waiting days for a reply, and often losing track of what was even asked for in the first place.", after: "The request lands with the right approver automatically. A decision comes back, the record updates itself, and everyone involved is notified instantly.", need: "Your approval chain (who approves what) · The types of requests to route · Where requests currently come in.", inLabel: "Request submitted", outLabel: "Routed + decided", bestFor: ["SMEs", "HR Teams", "Operations", "Multi-department businesses"] }, ar: { name: "محرك توجيه الموافقات", hook: "طلب — إجازة، شراء، أو غيره — يُوجَّه تلقائياً للمعتمد الصحيح، ويُخطر الجميع لحظة اتخاذ القرار.", before: "طلب الموافقة يعني ملاحقة شخص على واتساب، انتظار الرد أياماً، وغالباً فقدان تتبع ما طُلب أصلاً.", after: "الطلب يصل تلقائياً للمعتمد الصحيح. القرار يعود، السجل يُحدَّث بنفسه، ويُخطر جميع المعنيين فوراً.", need: "سلسلة اعتمادك (من يوافق على ماذا) · أنواع الطلبات المطلوب توجيهها · مصدر وصول الطلبات حالياً.", inLabel: "تقديم الطلب", outLabel: "توجيه وقرار", bestFor: ["شركات صغيرة", "فرق الموارد البشرية", "العمليات", "أعمال متعددة الأقسام"] } },
  { id: "CX1", category: "cx", icon: MessageCircle, outIcon: Bot, en: { name: "AI Customer Interaction Agent", hook: "Your customers message you — in text, a voice note, a photo, or a PDF — any hour. They get a real, useful answer instantly.", before: "Customers ask the same five questions all day, on top of the ones that actually need you. Answering all of them personally, at all hours, isn't possible.", after: "Customers message anytime, in whatever form is easiest for them. Routine questions get answered immediately, in your tone; anything real gets flagged straight to you.", need: "Your FAQ / knowledge base content · The WhatsApp Business number to connect · Which situations should escalate straight to a human.", inLabel: "Customer message", outLabel: "Instant AI reply", bestFor: ["Retail", "Clinics", "Agencies", "Any customer-facing business"] }, ar: { name: "وكيل تفاعل العملاء بالذكاء الاصطناعي", hook: "عملاؤك يراسلونك — نصاً، رسالة صوتية، صورة، أو PDF — بأي ساعة. يستلمون رداً حقيقياً ومفيداً فوراً.", before: "العملاء يسألون نفس الأسئلة الخمسة طوال اليوم، فوق ما يحتاج منك فعلاً. الرد على الجميع شخصياً، بكل الساعات، غير ممكن.", after: "العملاء يراسلون بأي وقت، بأي شكل يناسبهم. الأسئلة الروتينية تُجاب فوراً، بأسلوبك؛ وأي أمر حقيقي يصلك مباشرة.", need: "محتوى الأسئلة الشائعة/قاعدة معرفتك · رقم واتساب الأعمال للربط · الحالات التي تحتاج تصعيداً لموظف بشري.", inLabel: "رسالة عميل", outLabel: "رد فوري بالذكاء الاصطناعي", bestFor: ["تجزئة", "عيادات", "وكالات", "أي عمل يخدم عملاء"] } },
  { id: "CX2", category: "cx", icon: Globe2, outIcon: Bell, en: { name: "Website Monitoring", hook: "Your website or a competitor's changes. You get a plain-language summary of what changed and why it matters — not just 'something changed.'", before: "You either check competitor sites manually (rarely) or use a generic monitor that pings you with a raw diff you have to decode yourself.", after: "A page changes — pricing, a new product, a policy update — and you get one WhatsApp message explaining what changed and what it might mean for you.", need: "The website(s) or specific pages to monitor · How often you want checks run · Where alerts should go.", inLabel: "Page changes", outLabel: "Plain-language alert", bestFor: ["Retail", "Agencies", "Competitive industries"] }, ar: { name: "مراقبة المواقع الإلكترونية", hook: "موقعك أو موقع منافس يتغيّر. تستلم ملخصاً بلغة بسيطة عمّا تغيّر ولماذا يهم — لا مجرد 'حدث تغيير'.", before: "إما تتابع مواقع المنافسين يدوياً (نادراً)، أو تستخدم أداة مراقبة عامة تُرسل لك فروقات خام عليك فك رموزها بنفسك.", after: "صفحة تتغيّر — سعر، منتج جديد، تحديث سياسة — وتستلم رسالة واتساب واحدة تشرح ما تغيّر وماذا يعني لك.", need: "الموقع أو الصفحات المطلوب مراقبتها · وتيرة الفحص المطلوبة · وجهة التنبيهات.", inLabel: "تغيّر الصفحة", outLabel: "تنبيه بلغة بسيطة", bestFor: ["تجزئة", "وكالات", "قطاعات تنافسية"] } },
  { id: "CX3", category: "cx", icon: Star, outIcon: Activity, en: { name: "Customer Feedback Analyzer", hook: "Reviews and feedback are read and scored automatically — you get a heads-up the moment something turns negative.", before: "Feedback comes in across reviews, forms, and messages, and reading through all of it regularly — let alone catching a bad one early — rarely happens.", after: "Every piece of feedback is read and scored the moment it arrives. A genuinely negative one reaches you immediately, instead of surfacing weeks later.", need: "Where feedback currently comes in · What counts as urgent enough to flag immediately · Where alerts should go.", inLabel: "Feedback received", outLabel: "Scored + flagged", bestFor: ["Restaurants", "Clinics", "Retail", "Service businesses"] }, ar: { name: "محلل ملاحظات العملاء", hook: "التقييمات والملاحظات تُقرأ وتُصنَّف تلقائياً — تصلك رسالة فورية لحظة ظهور ملاحظة سلبية.", before: "الملاحظات تصل عبر التقييمات والنماذج والرسائل، وقراءتها جميعاً بانتظام — ناهيك عن رصد السلبي منها مبكراً — نادراً ما يحدث فعلياً.", after: "كل ملاحظة تُقرأ وتُصنَّف لحظة وصولها. الملاحظة السلبية الحقيقية تصلك فوراً، بدلاً من ظهورها بعد أسابيع.", need: "مصدر وصول الملاحظات حالياً · ما يُعد عاجلاً بما يكفي للتنبيه الفوري · وجهة التنبيهات.", inLabel: "استلام ملاحظة", outLabel: "تصنيف وتنبيه", bestFor: ["مطاعم", "عيادات", "تجزئة", "أعمال خدمية"] } },
  { id: "PP1", category: "people", icon: FileSearch, outIcon: ClipboardList, en: { name: "AI CV Screening", hook: "Applications come in. Each candidate is scored and summarized against what you're actually looking for — before you open a single CV.", before: "Twenty CVs land for one role, and reviewing each one properly eats an entire afternoon you don't have.", after: "Every application is automatically scored against your criteria, with a short summary of strengths and gaps — you start with your top five, not all twenty.", need: "The job description and the qualities that matter most · Where applications currently arrive · Your hiring manager's WhatsApp or email for summaries.", inLabel: "CV received", outLabel: "Scored + ranked", bestFor: ["HR Teams", "Recruitment Agencies", "Growing SMEs"] }, ar: { name: "فرز السير الذاتية بالذكاء الاصطناعي", hook: "الطلبات تصل. كل مرشح يُصنَّف ويُلخَّص وفق ما تبحث عنه فعلاً — قبل أن تفتح سيرة ذاتية واحدة.", before: "عشرون سيرة ذاتية تصل لوظيفة واحدة، ومراجعة كل واحدة بجدية تستهلك عصراً كاملاً لا تملكه.", after: "كل طلب يُصنَّف تلقائياً وفق معاييرك، مع ملخص قصير لنقاط القوة والفجوات — تبدأ بأفضل خمسة، لا العشرين جميعاً.", need: "الوصف الوظيفي والصفات الأهم لديك · مصدر وصول الطلبات حالياً · واتساب أو بريد مسؤول التوظيف.", inLabel: "استلام سيرة ذاتية", outLabel: "تصنيف وترتيب", bestFor: ["فرق الموارد البشرية", "وكالات التوظيف", "شركات نامية"] } },
  { id: "PP2", category: "people", icon: Camera, outIcon: Grid3x3, en: { name: "Construction Project Management", hook: "Site work gets logged in real time — a photo, a task update, a status — all landing in one place, from the field.", before: "Site progress lives in scattered phone photos and verbal updates, and by the time it reaches the office, nobody's sure what's actually done.", after: "Your site team logs progress and photos directly from their phones. It's organized automatically, so you always know exactly where a project stands.", need: "Your current project/task structure · Team members who'll be logging updates, and their Telegram usage · The Google Sheet you'd like progress tracked in.", inLabel: "Site update / photo", outLabel: "Tracked in Sheets", bestFor: ["Construction", "Contractors", "Facilities Management"] }, ar: { name: "إدارة مشاريع البناء", hook: "أعمال الموقع تُسجَّل لحظياً — صورة، تحديث مهمة، حالة — كلها تصل مكاناً واحداً، من الميدان.", before: "تقدّم الموقع يعيش في صور هاتف متناثرة وتحديثات شفهية، وبحلول وصولها للمكتب، لا أحد متأكد مما أُنجز فعلاً.", after: "فريق الموقع يسجّل التقدم والصور مباشرة من هواتفهم. يُنظَّم تلقائياً، فتعرف دائماً أين يقف المشروع بالضبط.", need: "هيكل مشاريعك/مهامك الحالي · أعضاء الفريق المسؤولين عن التحديث واستخدامهم لتيليجرام · جدول جوجل المطلوب تتبع التقدم فيه.", inLabel: "تحديث/صورة موقع", outLabel: "تتبع في Sheets", bestFor: ["البناء", "المقاولون", "إدارة المرافق"] } },
  { id: "PP3", category: "people", icon: UserPlus, outIcon: ClipboardCheck, en: { name: "Employee Onboarding", hook: "A new hire's accounts, welcome materials, and induction schedule are all set up the moment they're added — no manual checklist.", before: "A new hire starts, and Day 1 becomes a scramble of setting up accounts, finding the right documents, and hoping nothing important got missed.", after: "The moment a new hire is added, their accounts, welcome pack, and induction schedule are ready — ahead of their first day, not during it.", need: "Your standard onboarding steps and accounts to set up · Where new hire details are entered · Who should be notified at each step.", inLabel: "New hire added", outLabel: "Accounts + schedule ready", bestFor: ["HR Teams", "Growing SMEs", "Agencies"] }, ar: { name: "تهيئة الموظفين الجدد", hook: "حسابات الموظف الجديد، مواد الترحيب، وجدول التعريف — كلها تُجهَّز لحظة إضافته — بلا قائمة تحقق يدوية.", before: "موظف جديد يبدأ، ويتحول اليوم الأول إلى تهافت لإعداد الحسابات وإيجاد المستندات الصحيحة والأمل ألا يُنسى شيء مهم.", after: "لحظة إضافة الموظف الجديد، تكون حساباته وحزمة الترحيب وجدول التعريف جاهزة — قبل يومه الأول، لا خلاله.", need: "خطوات التهيئة القياسية والحسابات المطلوب إعدادها · مكان إدخال بيانات الموظف الجديد · من يجب إخطاره في كل خطوة.", inLabel: "إضافة موظف جديد", outLabel: "حسابات وجدول جاهز", bestFor: ["فرق الموارد البشرية", "شركات نامية", "وكالات"] } },
  { id: "PP4", category: "people", icon: MessageCircle, outIcon: Bot, en: { name: "AI Knowledge Assistant", hook: "Your team asks a question about company policy or process, and gets an instant, accurate answer — pulled from your own documents.", before: "A team member has a policy question, and the answer means interrupting a manager or digging through a folder of documents nobody's updated in a year.", after: "The same question gets typed into WhatsApp instead. An instant, accurate answer comes back — pulled directly from your actual, current documents.", need: "Your policy/process documents (a folder is enough — we structure it) · The internal WhatsApp or Slack channel to connect · Which topics should escalate to HR/management.", inLabel: "Team question", outLabel: "Instant answer", bestFor: ["HR Teams", "Growing SMEs", "Multi-location businesses"] }, ar: { name: "مساعد المعرفة الداخلي", hook: "أحد فريقك يسأل عن سياسة أو إجراء، ويستلم رداً فورياً ودقيقاً — مستخرجاً من مستنداتكم الخاصة.", before: "أحد الفريق لديه سؤال عن سياسة، والحصول على الجواب يعني مقاطعة مدير أو البحث في مجلد مستندات لم يُحدَّث منذ عام.", after: "نفس السؤال يُكتب في واتساب بدلاً من ذلك. جواب فوري ودقيق يعود — مستخرجاً مباشرة من مستنداتكم الحالية الفعلية.", need: "مستندات سياساتكم/إجراءاتكم (مجلد واحد يكفي — ننظّمه) · قناة واتساب أو Slack الداخلية للربط · المواضيع التي تحتاج تصعيداً للموارد البشرية/الإدارة.", inLabel: "سؤال من الفريق", outLabel: "جواب فوري", bestFor: ["فرق الموارد البشرية", "شركات نامية", "أعمال متعددة الفروع"] } },
  { id: "PP5", category: "people", icon: Mic, outIcon: ClipboardList, en: { name: "Meeting-to-Tasks Automation", hook: "A meeting gets recorded. The summary, decisions, and action items — with owners assigned — are ready before you're back at your desk.", before: "A meeting ends with a dozen decisions made verbally, and by the next day half of them are forgotten or nobody's sure who owns what.", after: "The recording is processed automatically. A clean summary with decisions and action items — each with an owner — lands before you're even back at your desk.", need: "How your meetings are recorded · Where tasks should be logged · Who should receive the summary.", inLabel: "Meeting recorded", outLabel: "Tasks assigned", bestFor: ["Management Teams", "Agencies", "Consultancies"] }, ar: { name: "أتمتة تحويل الاجتماعات إلى مهام", hook: "الاجتماع يُسجَّل. الملخص والقرارات ومهام العمل — مع تحديد المسؤولين — جاهزة قبل عودتك لمكتبك.", before: "الاجتماع ينتهي بعشرات القرارات المتخذة شفهياً، وبحلول اليوم التالي، نصفها منسي أو لا أحد متأكد من مسؤوليته.", after: "التسجيل يُعالَج تلقائياً. ملخص واضح بالقرارات ومهام العمل — لكل منها مسؤول — يصلك قبل عودتك لمكتبك حتى.", need: "طريقة تسجيل اجتماعاتكم · مكان تسجيل المهام · من يجب أن يستلم الملخص.", inLabel: "تسجيل الاجتماع", outLabel: "مهام موزعة", bestFor: ["فرق الإدارة", "وكالات", "استشارات"] } },
  { id: "PW1", category: "personal", icon: Mail, outIcon: MessageCircle, en: { name: "AI Inbox Manager", hook: "Your inbox gets read for you. You get the actions that actually need you — not the full flood.", before: "Important requests, approvals, and deadlines sit buried in an inbox with hundreds of unread messages — easy to miss, easy to forget.", after: "One daily WhatsApp message tells you exactly what needs a decision or action from you today — everything else stays out of your way.", need: "Access to the email account to be monitored · What counts as 'needs action' for you · How often you want the digest.", inLabel: "Inbox", outLabel: "Action-only digest", bestFor: ["Executives", "Busy Professionals", "Founders"] }, ar: { name: "مدير البريد الوارد بالذكاء الاصطناعي", hook: "بريدك الوارد يُقرأ نيابة عنك. تستلم فقط ما يحتاج فعلاً إجراءً منك — لا الفيضان كاملاً.", before: "الطلبات المهمة والموافقات والمواعيد النهائية تُدفن في بريد به مئات الرسائل غير المقروءة — سهلة الضياع، سهلة النسيان.", after: "رسالة واتساب واحدة يومياً تخبرك بالضبط بما يحتاج قراراً أو إجراءً منك اليوم — كل شيء آخر يبقى بعيداً عن طريقك.", need: "الوصول لحساب البريد المطلوب مراقبته · ما يُعد 'يحتاج إجراءً' بالنسبة لك · وتيرة الملخص المطلوبة.", inLabel: "البريد الوارد", outLabel: "ملخص الإجراءات فقط", bestFor: ["تنفيذيون", "محترفون مشغولون", "مؤسسو شركات"] } },
  { id: "PW2", category: "personal", icon: Camera, outIcon: Utensils, en: { name: "Meal & Drink Logging", hook: "Photograph your meal or drink. Get a full nutritional breakdown in seconds — and a pattern report every week.", before: "You have no real sense of what you're actually eating day to day, and tracking it manually is tedious enough that most people quit within a week.", after: "A photo sent to WhatsApp becomes a full nutritional breakdown instantly. A weekly summary shows your patterns — best days, worst days, what to watch.", need: "The WhatsApp number that will send meal/drink photos · Any dietary goals or conditions to factor in (optional) · Preferred report frequency.", inLabel: "Meal photo", outLabel: "Nutrition breakdown", bestFor: ["Individuals", "Fitness-focused", "Health-conscious professionals"], disclaimer: "Taskless is not a medical service. Nutritional data is AI-estimated and for guidance only. Please consult a licensed professional for medical concerns." }, ar: { name: "تسجيل الوجبات والمشروبات", hook: "صوّر وجبتك أو مشروبك. احصل على تحليل غذائي كامل خلال ثوانٍ — وتقرير أنماط أسبوعي.", before: "لا فكرة حقيقية لديك عمّا تأكله فعلاً يومياً، وتتبعه يدوياً مملّ بما يكفي ليتوقف معظم الناس خلال أسبوع.", after: "صورة تُرسل لواتساب تتحول لتحليل غذائي كامل فوراً. ملخص أسبوعي يوضح أنماطك — أفضل الأيام وأسوأها وما يجب مراقبته.", need: "رقم واتساب إرسال صور الوجبات/المشروبات · أي أهداف أو حالات غذائية (اختياري) · وتيرة التقرير المفضلة.", inLabel: "صورة وجبة", outLabel: "تحليل غذائي", bestFor: ["أفراد", "مهتمون باللياقة", "محترفون مهتمون بالصحة"], disclaimer: "Taskless ليست خدمة طبية. البيانات الغذائية مقدّرة بالذكاء الاصطناعي ولأغراض إرشادية فقط. يرجى استشارة مختص مرخّص لأي مخاوف طبية." } },
];

const ICON_MAP = {
  message_circle: MessageCircle, receipt: Receipt, bar_chart: BarChart3, calendar_clock: CalendarClock,
  star: Star, sparkles: Sparkles, share: Share2, newspaper: Newspaper, calendar_days: CalendarDays,
  handshake: Handshake, bell: Bell, file_search: FileSearch, timer: Timer, mail: Mail,
  clipboard_check: ClipboardCheck, calendar_check: CalendarCheck2, wallet: Wallet, pill: Pill,
  clipboard_list: ClipboardList, camera: Camera, moon: Moon, activity: Activity, droplet: Droplet,
  line_chart: LineChart, sun: Sun, grid: Grid3x3, check: Check, utensils: Utensils,
  globe: Globe2, map_pin: MapPin, user_plus: UserPlus, mic: Mic, send: Send, bot: Bot,
};

const PRODUCTS_API = "REPLACE_WITH_YOUR_N8N_URL/webhook/products";
const REQUESTS_API = "https://script.google.com/macros/s/AKfycbx6aL1k1GnAuYD2ca2KGgSTN1G5EJSoDLFqyMihp8orCXsRYFZoOyOGPAxp_t8Mlp36/exec";

function normalizeProduct(raw) {
  return {
    id: raw.id, category: raw.category,
    icon: ICON_MAP[raw.icon_key] || Sparkles,
    outIcon: ICON_MAP[raw.out_icon_key] || Sparkles,
    en: raw.en, ar: raw.ar,
  };
}

function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function audienceOf(p) { return p.category === "personal" ? "individual" : "business"; }

const SIMPLE_DELIVERY_IDS = new Set(["SG1", "SG4", "OF3", "CX2", "PW1"]);
const COMPLEX_DELIVERY_IDS = new Set(["SG2", "SG5", "OF1", "OF2", "OF5", "CX1", "PP1", "PP4", "PP5", "PW2"]);
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

export default function TasklessLanding() {
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = UI[lang]; const rtl = lang === "ar"; const th = THEMES[theme];
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  useEffect(() => {
    if (PRODUCTS_API.startsWith("REPLACE_WITH")) return;
    fetch(PRODUCTS_API)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data?.products) && data.products.length) {
          setProducts(data.products.map(normalizeProduct));
        }
      })
      .catch(() => {});
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
                    {[["section-hero", t.menu.home], ["section-products", t.menu.products], ["section-how", t.menu.how], ["section-why", t.menu.why], ["section-contact", t.menu.contact], ["section-faq", t.menu.faq]].map(([id, label]) => (
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

        {outer.map((n, i) => { const nx = outer[(i + 1) % outer.length]; return <line key={`web-${i}`} x1={n.x} y1={n.y} x2={nx.x} y2={nx.y} stroke={th.borderStrong} strokeWidth="1" opacity="0.35" />; })}
        {outer.map((n, i) => <line key={`branch-${i}`} x1={n.x} y1={n.y} x2={n.nearest.x} y2={n.nearest.y} stroke="url(#linegrad)" strokeWidth="1" opacity="0.22" />)}
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

function MiniFlow({ fromIcon: FromIcon, fromColor, toIcon: ToIcon, fromLabel, toLabel, th, automateLabel, size = "sm" }) {
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

function TLogo({ size = 26 }) {
  return <svg width={size} height={size} viewBox="0 0 40 40"><defs><linearGradient id="tgradnav" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2563EB" /><stop offset="100%" stopColor="#06B6D4" /></linearGradient></defs><path d="M6 8 H34 M20 8 V32 Q20 36 24 34" stroke="url(#tgradnav)" strokeWidth="5" fill="none" strokeLinecap="round" /></svg>;
}
function IconToggle({ children, onClick, th, label, wide }) {
  return <button onClick={onClick} aria-label={label} title={label} style={{ background: th.elevated, border: `1px solid ${th.borderStrong}`, color: th.text, borderRadius: 10, padding: wide ? "8px 12px" : "8px", gap: 5, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>{children}</button>;
}
function AudienceBadge({ p, t, th }) {
  const aud = audienceOf(p);
  const Icon = aud === "business" ? Building2 : User;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 600, color: th.muted3 }}>
      <Icon size={11} /> {t.audienceLabels[aud]}
    </span>
  );
}
function ProductCard({ p, i, inView, lang, rtl, th, t, onOpen }) {
  const color = CATEGORY_COLORS[p.category]; const d = p[lang]; const Icon = p.icon;
  return (
    <div className="card card-hover" style={{ scrollSnapAlign: "start", minWidth: 264, maxWidth: 264, borderRadius: 18, padding: 22, background: th.elevated, border: `1px solid ${th.border}`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0) scale(1)" : "translateY(28px) scale(0.96)", transition: `opacity .6s cubic-bezier(.22,1,.36,1) ${i * 0.12}s, transform .6s cubic-bezier(.22,1,.36,1) ${i * 0.12}s, box-shadow .25s ease, border-color .25s ease` }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: color }} /><span style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: th.muted3 }}>{t.categoryLabels[p.category]}</span></div>
        <span style={{ fontSize: 10.5, fontWeight: 600, color: "#06B6D4", background: "#06B6D41A", borderRadius: 6, padding: "2px 7px" }}>{deliveryLabel(p.id, t)}</span>
      </div>
      <div style={{ marginBottom: 8 }}><AudienceBadge p={p} t={t} th={th} /></div>
      <h3 className="display" style={{ fontSize: 17.5, fontWeight: 700, margin: "0 0 8px" }}>{d.name}</h3>
      <p style={{ fontSize: 13, color: th.muted2, lineHeight: 1.5, minHeight: 40, margin: "0 0 10px" }}>{d.hook}</p>
      <MiniFlow fromIcon={Icon} fromColor={color} toIcon={p.outIcon} fromLabel={d.inLabel} toLabel={d.outLabel} th={th} automateLabel={t.automateLabel} />
      <button onClick={onOpen} style={{ background: "none", border: "none", color, fontSize: 13.5, fontWeight: 600, cursor: "pointer", gap: 4, padding: 0, marginTop: 10 }}>{t.seeMore} <ArrowRight size={14} style={{ transform: rtl ? "rotate(180deg)" : "none" }} /></button>
    </div>
  );
}
function DetailDrawer({ product, lang, rtl, th, t, onClose, onRequest }) {
  const color = CATEGORY_COLORS[product.category]; const d = product[lang]; const Icon = product.icon;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: th.overlay, backdropFilter: "blur(3px)" }} />
      <div style={{ position: "relative", width: "100%", maxWidth: 560, maxHeight: "88vh", overflowY: "auto", background: th.elevated, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: "32px 28px 40px", border: `1px solid ${th.border}`, animation: "slideup .35s ease", textAlign: rtl ? "right" : "left" }}>
        <button onClick={onClose} aria-label="Close" style={{ position: "absolute", top: 20, [rtl ? "left" : "right"]: 20, background: "none", border: "none", color: th.muted2, cursor: "pointer" }}><X size={22} /></button>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}><Icon size={22} color={color} /></div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color }}>{t.categoryLabels[product.category]}</span>
          <AudienceBadge p={product} t={t} th={th} />
        </div>
        <h2 className="display" style={{ fontSize: 24, fontWeight: 700, margin: "8px 0 14px" }}>{d.name}</h2>

        {d.bestFor && d.bestFor.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 11, letterSpacing: 0.5, color: th.muted3, fontWeight: 600, marginBottom: 8 }}>{t.bestForLabel}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {d.bestFor.map((tag, i) => (
                <span key={i} style={{ fontSize: 11.5, fontWeight: 600, color: th.muted2, background: th.bg, border: `1px solid ${th.borderStrong}`, borderRadius: 8, padding: "4px 9px" }}>{tag}</span>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginBottom: 22, padding: "18px 4px", borderTop: `1px solid ${th.border}`, borderBottom: `1px solid ${th.border}` }}>
          <MiniFlow fromIcon={Icon} fromColor={color} toIcon={product.outIcon} fromLabel={d.inLabel} toLabel={d.outLabel} th={th} automateLabel={t.automateLabel} size="lg" />
        </div>
        <Block label={t.drawer.before} text={d.before} th={th} />
        <Block label={t.drawer.after} text={d.after} color={color} th={th} />
        <Block label={t.drawer.need} text={d.need} th={th} />

        <div style={{ marginBottom: 20, borderRadius: 12, border: `1px solid ${th.border}`, padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>{t.deliverablesTitle}</div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: th.text }}>{t.transferTitle}</div>
            <p style={{ fontSize: 12.5, color: th.muted2, margin: "3px 0 0", lineHeight: 1.5 }}>{t.transferBody}</p>
          </div>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: th.text }}>{t.hostedTitle}</div>
            <p style={{ fontSize: 12.5, color: th.muted2, margin: "3px 0 0", lineHeight: 1.5 }}>{t.hostedBody}</p>
          </div>
          <p style={{ fontSize: 11.5, color: th.muted3, fontStyle: "italic", marginTop: 10, marginBottom: 0 }}>{t.customizableNote}</p>
        </div>

        {d.disclaimer && (
          <p style={{ fontSize: 11, color: th.muted3, lineHeight: 1.6, marginBottom: 20, padding: 10, background: th.bg, borderRadius: 8 }}>{d.disclaimer}</p>
        )}

        <button className="cta-hover" style={{ ...btnPrimary, width: "100%", marginTop: 4, justifyContent: "center" }} onClick={() => { onRequest(); onClose(); setTimeout(() => scrollToId("section-contact"), 150); }}>{t.drawer.cta} <ArrowRight size={16} style={{ [rtl ? "marginRight" : "marginLeft"]: 6, transform: rtl ? "rotate(180deg)" : "none" }} /></button>
      </div>
    </div>
  );
}
function Block({ label, text, color, th }) {
  return <div style={{ marginBottom: 20 }}><div style={{ fontSize: 12, letterSpacing: 0.5, color: color || th.muted2, fontWeight: 600, marginBottom: 6 }}>{label}</div><p style={{ fontSize: 14.5, lineHeight: 1.6, color: th.muted, margin: 0 }}>{text}</p></div>;
}
function CatalogView({ products, t, th, rtl, lang, onBack, onOpen }) {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const categories = ["all", "sales", "ops", "cx", "people", "personal"];
  const filtered = products.filter((p) => {
    const d = p[lang];
    const matchesCat = activeCat === "all" || p.category === activeCat;
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || d.name.toLowerCase().includes(q) || d.hook.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
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
        {categories.map((c) => (
          <button key={c} className="filter-pill" onClick={() => setActiveCat(c)} style={{
            border: `1px solid ${activeCat === c ? CATEGORY_COLORS[c] || "#06B6D4" : th.borderStrong}`,
            background: activeCat === c ? `${CATEGORY_COLORS[c] || "#06B6D4"}1A` : th.elevated,
            color: activeCat === c ? (CATEGORY_COLORS[c] || "#06B6D4") : th.muted2,
            borderRadius: 20, padding: "7px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>{c === "all" ? t.allCategories : t.categoryLabels[c]}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: th.muted3, fontSize: 14, padding: "40px 0", textAlign: "center" }}>
          {rtl ? "لا توجد نتائج مطابقة." : "No workflows match that search."}
        </p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 18 }}>
          {filtered.map((p) => { const d = p[lang]; const color = CATEGORY_COLORS[p.category]; const Icon = p.icon; return (
            <div key={p.id} className="card-hover" style={{ borderRadius: 16, padding: 20, background: th.elevated, border: `1px solid ${th.border}`, transition: "box-shadow .25s ease, border-color .25s ease, transform .25s ease" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: color }} /><span style={{ fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", color: th.muted3 }}>{t.categoryLabels[p.category]}</span></div>
                <span style={{ fontSize: 10, fontWeight: 600, color: "#06B6D4", background: "#06B6D41A", borderRadius: 6, padding: "2px 6px" }}>{deliveryLabel(p.id, t)}</span>
              </div>
              <div style={{ marginBottom: 8 }}><AudienceBadge p={p} t={t} th={th} /></div>
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
