/* ==========================================================================
   قوائم الألوان (الـ 6 الفخمة وقائمة الـ 200 لون المتدرجة)
   ========================================================================== */

// 1. الألوان الستة الفخمة والوقورة المختارة بعناية (الأزرق السماوي الراقي أولاً)
const primarySixLuxuryColors = [
  "#0284C7", // الأزرق السماوي الراقي (الافتراضي)
  "#0F172A", // الكحلي الليلي الملكي
  "#064E3B", // الأخضر الزمردي الوقور
  "#0F766E", // الفيروزي العميق
  "#78350F", // الذهبي البرونزي الدافئ
  "#831843"  // العنابي الهادئ
];

// 2. قائمة الـ 200 لون المنظمة بتدرجات راقية (تدرجات متجانسة ومتسلسلة بدقة)
const allTwoHundredColors = [
  // الأزرق والسماوي والفيروزي (1 - 32)
  "#0284C7", "#0369A1", "#075985", "#0C4A6E", "#38BDF8", "#7DD3FC", "#BAE6FD", "#E0F2FE",
  "#0288D1", "#01579B", "#0097A7", "#00838F", "#006064", "#00ACC1", "#26C6DA", "#80DEEA",
  "#0F766E", "#115E59", "#134E4A", "#14B8A6", "#2DD4BF", "#5EEAD4", "#99F6E4", "#CCFBF1",
  "#0891B2", "#0E7490", "#155E75", "#164E63", "#06B6D4", "#22D3EE", "#67E8F9", "#A5F3FC",
  
  // الكحلي والنيلي والأزرق الملكي (33 - 64)
  "#0F172A", "#1E293B", "#334155", "#475569", "#64748B", "#94A3B8", "#CBD5E1", "#E2E8F0",
  "#1E3A8A", "#1D4ED8", "#2563EB", "#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE", "#DBEAFE",
  "#1A237E", "#283593", "#303F9F", "#3949AB", "#3F51B5", "#5C6BC0", "#7986CB", "#9FA8DA",
  "#312E81", "#3730A3", "#4338CA", "#4F46E5", "#6366F1", "#818CF8", "#A5B4FC", "#C7D2FE",

  // الأخضر والزيتوني والزمردي (65 - 96)
  "#064E3B", "#065F46", "#047857", "#059669", "#10B981", "#34D399", "#6EE7B7", "#A7F3D0",
  "#14532D", "#166534", "#15803D", "#16A34A", "#22C55E", "#4ADE80", "#86EFAC", "#BBF7D0",
  "#1B5E20", "#2E7D32", "#388E3C", "#43A047", "#4CAF50", "#66BB6A", "#81C784", "#A5D6A7",
  "#365314", "#3F6212", "#4D7C0F", "#65A30D", "#84CC16", "#A3E635", "#BEF264", "#D9F99D",

  // البنفسجي والأرجواني والميدنايت (97 - 128)
  "#3B0764", "#4A044E", "#581C87", "#6B21A8", "#7E22CE", "#9333EA", "#A855F7", "#C084FC",
  "#4A148C", "#6A1B9A", "#7B1FA2", "#8E24AA", "#9C27B0", "#AB47BC", "#BA68C8", "#CE93D8",
  "#701A75", "#86198F", "#A21CAF", "#C026D3", "#D946EF", "#E879F9", "#F0ABFC", "#F5D0FE",
  "#831843", "#9D174D", "#BE185D", "#DB2777", "#EC4899", "#F472B6", "#F9A8D4", "#FBCFE8",

  // العنابي والأحمر والياقوتي (129 - 160)
  "#881337", "#9F1239", "#BE123C", "#E11D48", "#F43F5E", "#FB7185", "#FDA4AF", "#FECDD3",
  "#7F1D1D", "#991B1B", "#B91C1C", "#DC2626", "#EF4444", "#F87171", "#FCA5A5", "#FECACA",
  "#B71C1C", "#C62828", "#D32F2F", "#E53935", "#F44336", "#EF5350", "#E57373", "#EF9A9A",
  "#7C2D12", "#9A3412", "#C2410C", "#EA580C", "#F97316", "#FB923C", "#FDBA74", "#FED7AA",

  // الذهبي والبرونزي والبني الترابي والرمادي (161 - 200)
  "#78350F", "#92400E", "#B45309", "#D97706", "#F59E0B", "#FBBF24", "#FCD34D", "#FDE68A",
  "#713F12", "#854D0E", "#A16207", "#CA8A04", "#EAB308", "#FACC15", "#FDE047", "#FEF08A",
  "#3E2723", "#4E342E", "#5D4037", "#6D4C41", "#795548", "#8D6E63", "#A1887F", "#BCAAA4",
  "#451A03", "#78350F", "#9A3412", "#A24B15", "#B85D19", "#C87023", "#D9822B", "#E89740",
  "#111827", "#1F2937", "#374151", "#4B5563", "#6B7280", "#9CA3AF", "#D1D5DB", "#E5E7EB"
];

/* ==========================================================================
   مصفوفة اللغات والاتجاهات
   ========================================================================== */
const languages = [
  { code: "العربية", name: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "English", name: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "اردو", name: "اردو", flag: "🇵🇰", dir: "rtl" },
  { code: "Français", name: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "Deutsch", name: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  { code: "Русский", name: "Русский", flag: "🇷🇺", dir: "ltr" },
  { code: "Español", name: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "हिन्दी", name: "हिन्दी", flag: "🇮🇳", dir: "ltr" },
  { code: "Indonesia", name: "Indonesia", flag: "🇮🇩", dir: "ltr" }
];

/* ==========================================================================
   بيانات التكبيرات والصلوات (Steps Data)
   ========================================================================== */
const stepsData = [
  { 
    title: { English: "First Takbeer - Surah Al-Fatihah", العربية: "التكبيرة الأولى - سورة الفاتحة", اردو: "پہلی تکبیر - سورۃ الفاتحہ", Français: "Premier Takbir - Sourate Al-Fatiha", Deutsch: "Erster Takbir - Sure Al-Fatiha", Русский: "Первый такбир - Сура Аль-Фатиха", Español: "Primer Takbir - Sura Al-Fatiha", हिन्दी: "पहली तकबीर - सूरह अल-फ़ातिहा", Indonesia: "Takbir Pertama - Surah Al-Fatihah" },
    icon: "📖",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ * الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ * الرَّحْمَنِ الرَّحِيمِ * مَالِكِ يَوْمِ الدِّينِ * إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ * اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ * صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", 
    translit: "Bismillahir-Rahmanir-Raheem, Alhamdu lillahi rabbil 'aalameen, Ar-Rahmanir-Raheem, Maliki yawmid-deen, Iyyaka na'budu wa iyyaka nasta'een, Ihdinas-siratal-mustaqeem, Siratal-latheena an'amta 'alayhim ghayril-maghdoobi 'alayhim wa lad-daalleen", 
    translations: { 
      English: "In the name of Allah, the Most Gracious, the Most Merciful. All praise is due to Allah, Lord of the worlds. The Most Gracious, the Most Merciful. Master of the Day of Judgment. You alone we worship, and You alone we ask for help. Guide us to the straight path. The path of those You have blessed, not of those who earned anger, nor of those who went astray.", 
      العربية: "بسم الله الرحمن الرحيم. الحمد لله رب العالمين. الرحمن الرحيم. مالك يوم الدين. إياك نعبد وإياك نستعين. اهدنا الصراط المستقيم. صراط الذين أنعمت عليهم غير المغضوب عليهم ولا الضالين.", 
      Français: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux. Louange à Allah, Seigneur de l'univers. Le Tout Miséricordieux, le Très Miséricordieux. Maître du Jour de la rétribution. C'est Toi seul que nous adorons, et c'est Toi seul dont nous implorons secours. Guide-nous dans le droit chemin. Le chemin de ceux que Tu as comblés de faveurs, non pas de ceux qui ont encouru Ta colère, ni des égarés.", 
      اردو: "اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔ تمام تعریفیں اللہ کے لیے ہیں جو تمام جہانوں کا رب ہے۔ بڑا مہربان، نہایت رحم والا۔ روزِ جزا کا مالک۔ ہم صرف تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں۔ ہمیں سیدھا راستہ دکھا۔ ان لوگوں کا راستہ جن پر تو نے انعام کیا، نہ ان کا جن پر غضب ہوا اور نہ گمراہوں کا۔", 
      Deutsch: "Im Namen Allahs, des Allerbarmers, des Barmherzigen. Alles Lob gebührt Allah, dem Herrn der Welten. Dem Allerbarmers, dem Barmherzigen. Dem Herrscher am Tag des Gerichts. Dir allein dienen wir, und Dich allein bitten wir um Hilfe. Führe uns den geraden Weg. Den Weg derer, denen Du Gnade erwiesen hast, nicht derer, die Zorn erregt haben, und nicht der Irrenden.", 
      Русский: "Во имя Аллаха, Милостивого, Милосердного. Хвала Аллаху, Господу миров. Милостивому, Милосердному. Властелину Судного дня. Тебе одному мы поклоняемся и Тебя одного молим о помощи. Веди нас прямым путём. Путём тех, кого Ты облагодетельствовал, не тех, на кого пал гнев, и не заблудших.", 
      Español: "En el nombre de Alá, el Más Misericordioso, el Más Compasivo. Toda alabanza pertenece a Alá, Señor de los mundos. El Más Misericordioso, el Más Compasivo. Soberano del Día del Juicio. Solo a Ti te adoramos y solo a Ti te pedimos ayuda. Guíanos por el camino recto. El camino de aquellos a quienes has favorecido, no el de los que han incurrido en Tu ira, ni el de los extraviados.", 
      हिन्दी: "अल्लाह के नाम से, जो बड़ा मेहरबान और निहायत रहम वाला है। सारी तारीफ़ अल्लाह के लिए है, जो सारे जहानों का रब है। बड़ा मेहरबान, निहायत रहम वाला। क़यामत के दिन का मालिक। हम सिर्फ़ तेरी ही इबादत करते हैं और सिर्फ़ तुझसे ही मदद माँगते हैं। हमें सीधा रास्ता दिखा। उन लोगों का रास्ता जिन पर तूने इनाम किया, न उनका जिन पर ग़ज़ब हुआ और न गुमराहों का।", 
      Indonesia: "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah, Tuhan seluruh alam. Yang Maha Pengasih lagi Maha Penyayang. Pemilik hari pembalasan. Hanya kepada-Mu kami menyembah dan hanya kepada-Mu kami memohon pertolongan. Tunjukilah kami jalan yang lurus. Yaitu jalan orang-orang yang telah Engkau beri nikmat, bukan jalan mereka yang dimurkai, dan bukan pula jalan mereka yang sesat." 
    } 
  },
  { 
    title: { English: "Second Takbeer - The Ibrahimiyyah Prayer", العربية: "التكبيرة الثانية - الصلاة الإبراهيمية", اردو: "دوسری تکبیر - درود ابراہیمی", Français: "Deuxième Takbir - La Prière Ibrahimiyyah", Deutsch: "Zweiter Takbir - Das Ibrahimitische Gebet", Русский: "Второй такбир - Ибрахимова молитва", Español: "Segundo Takbir - La Oración Ibrahimiyyah", हिन्दी: "दूसरी तकबीर - इब्राहीमी दुआ", Indonesia: "Takbir Kedua - Shalawat Ibrahimiyah" },
    icon: "✨",
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ", 
    translit: "Allahumma salli 'ala Muhammadin wa 'ala aali Muhammad, kama sallayta 'ala Ibrahima wa 'ala aali Ibrahim, innaka Hamidun Majeed. Allahumma barik 'ala Muhammadin wa 'ala aali Muhammad, kama barakta 'ala Ibrahima wa 'ala aali Ibrahim, innaka Hamidun Majeed", 
    translations: { 
      English: "O Allah, send prayers upon Muhammad and upon the family of Muhammad, as You sent prayers upon Abraham and upon the family of Abraham. Indeed, You are Praiseworthy, Glorious. O Allah, send blessings upon Muhammad and upon the family of Muhammad, as You sent blessings upon Abraham and upon the family of Abraham. Indeed, You are Praiseworthy, Glorious.", 
      العربية: "اللهم صل على محمد وعلى آل محمد، كما صليت على إبراهيم وعلى آل إبراهيم، إنك حميد مجيد. اللهم بارك على محمد وعلى آل محمد، كما باركت على إبراهيم وعلى آل إبراهيم، إنك حميد مجيد.", 
      Français: "Ô Allah, prie sur Muhammad et sur la famille de Muhammad, comme Tu as prié sur Abraham et sur la famille d'Abraham. Tu es certes Digne de louange et de gloire. Ô Allah, bénis Muhammad et la famille de Muhammad, comme Tu as béni Abraham et la famille d'Abraham. Tu es certes Digne de louange et de gloire.", 
      اردو: "اے اللہ! محمد اور آل محمد پر رحمت نازل فرما، جیسا کہ تو نے ابراہیم اور آل ابراہیم پر رحمت نازل کی۔ بے شک تو قابلِ تعریف اور بزرگ ہے۔ اے اللہ! محمد اور آل محمد پر برکت نازل فرما، جیسا کہ تو نے ابراہیم اور آل ابراہیم پر برکت نازل کی۔ بے شک تو قابلِ تعریف اور بزرگ ہے۔", 
      Deutsch: "O Allah, sende Frieden auf Muhammad und auf die Familie Muhammads, wie Du Frieden auf Abraham und auf die Familie Abrahams gesandt hast. Wahrlich, Du bist der Preiswürdige, der Ruhmreiche. O Allah, segne Muhammad und die Familie Muhammads, wie Du Abraham und die Familie Abrahams gesegnet hast. Wahrlich, Du bist der Preiswürdige, der Ruhmreiche.", 
      Русский: "О Аллах, благослови Мухаммада и семейство Мухаммада, как благословил Ты Ибрахима и семейство Ибрахима. Поистине, Ты Достойный хвалы, Славный. О Аллах, пошли благословения Мухаммаду и семейству Мухаммада, как послал Ты благословения Ибрахиму и семейству Ибрахима. Поистине, Ты Достойный хвалы, Славный.", 
      Español: "Oh Allah, envía paz sobre Muhammad y sobre la familia de Muhammad, como enviaste paz sobre Abraham y sobre la familia de Abraham. Ciertamente, Tú eres Digno de alabanza, Glorioso. Oh Allah, bendice a Muhammad y a la familia de Muhammad, como bendijiste a Abraham y a la familia de Abraham. Ciertamente, Tú eres Digno de alabanza, Glorioso.", 
      हिन्दी: "ऐ अल्लाह, मुहम्मद और मुहम्मद के परिवार पर दया भेज, जैसे तूने इब्राहीम और इब्राहीम के परिवार पर दया भेजी। बेशक तू प्रशंसनीय और महान है। ऐ अल्लाह, मुहम्मद और मुहम्मद के परिवार पर बरकत भेज, जैसे तूने इब्राहीम और इब्राहीम के परिवार पर बरकत भेजी। बेशक तू प्रशंसनीय और महान है।", 
      Indonesia: "Ya Allah, limpahkan rahmat kepada Muhammad dan keluarga Muhammad, sebagaimana Engkau melimpahkan rahmat kepada Ibrahim dan keluarga Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia. Ya Allah, berkahilah Muhammad dan keluarga Muhammad, sebagaimana Engkau memberkahi Ibrahim dan keluarga Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia." 
    } 
  },
  { 
    title: { English: "Third Takbeer - Dua for the Deceased", العربية: "التكبيرة الثالثة - الدعاء للميت", اردو: "تیسری تکبیر - میت کے لیے دعا", Français: "Troisième Takbir - Invocation pour le défunt", Deutsch: "Dritter Takbir - Bittgebet für den Verstorbenen", Русский: "Третий такбир - Мольба за умершего", Español: "Tercer Takbir - Súplica por el difunto", हिन्दी: "तीसरी तकबीर - मृतक के लिए दुआ", Indonesia: "Takbir Ketiga - Doa untuk Mayit" },
    icon: "🤲",
    arabic: "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ، وَأَكْرِمْ نُزُلَهُ، وَوَسِّعْ مُدْخَلَهُ، وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ، وَنَقِّهِ مِنَ الْخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الْأَبْيَضَ مِنَ الدَّنَسِ، وَأَبْدِلْهُ دَارًا خَيْرًا مِنْ دَارِهِ، وَأَهْلًا خَيْرًا مِنْ أَهْلِهِ، وَزَوْجًا خَيْرًا مِنْ زَوْجِهِ، وَأَدْخِلْهُ الْجَنَّةَ وَأَعِذْهُ مِنْ عَذَابِ الْقَبْرِ، وَمِنْ عَذَابِ النَّارِ", 
    translit: "Allahumma-ghfir lahu warhamhu wa 'aafihi wa'fu 'anhu, wa akrim nuzulahu, wa wassi' mudkhalahu, waghsilhu bil-ma'i wath-thalji wal-barad, wa naqqihi minal-khataya kama naqqaytath-thawbal-abyada minad-danas, wa abdilhu daran khayran min darihi, wa ahlan khayran min ahlihi, wa zawjan khayran min zawjihi, wa adkhilhul-jannata wa a'idh-hu min 'adhabil-qabri, wa min 'adhabin-nar", 
    translations: { 
      English: "O Allah, forgive him and have mercy on him, and grant him well-being and pardon him. Honor his abode, and widen his entrance, and wash him with water, snow and hail, and purify him from sins as You purified the white garment from dirt. And exchange his home for a better home, and his family for a better family, and his spouse for a better spouse. Admit him to Paradise and protect him from the punishment of the grave and from the punishment of the Fire.", 
      العربية: "اللهم اغفر له وارحمه وعافه واعف عنه، وأكرم نزله، ووسع مدخله، واغسله بالماء والثلج والبرد، ونقه من الخطايا كما نقيت الثوب الأبيض من الدنس، وأبدله داراً خيراً من داره، وأهلاً خيراً من أهله، وزوجاً خيراً من زوجه، وأدخله الجنة وأعذه من عذاب القبر ومن عذاب النار.", 
      Français: "Ô Allah, pardonne-lui et fais-lui miséricorde, et accorde-lui le bien-être et pardonne-lui. Honore sa demeure, élargis son entrée, et lave-le avec l'eau, la neige et la grêle, et purifie-le des péchés comme Tu as purifié le vêtement blanc de la saleté. Et remplace sa maison par une meilleure maison, et sa famille par une meilleure famille, et son épouse par une meilleure épouse. Fais-le entrer au Paradis et protège-le du châtiment de la tombe et du châtiment du Feu.", 
      اردو: "اے اللہ! اسے بخش دے اور اس پر رحم فرما، اور اسے عافیت دے اور اسے معاف کر دے۔ اس کی مہمانی کا اکرام فرما، اور اس کی داخل ہونے کی جگہ وسیع فرما، اور اسے پانی، برف اور اولوں سے دھو دے، اور اسے گناہوں سے اس طرح پاک کر دے جیسے تو نے سفید کپڑے کو میل سے پاک کیا۔ اور اسے اس کے گھر سے بہتر گھر دے، اور اس کے اہل سے بہتر اہل دے، اور اس کی بیوی سے بہتر بیوی دے۔ اسے جنت میں داخل فرما اور قبر کے عذاب اور آگ کے عذاب سے بچا۔", 
      Deutsch: "O Allah, vergib ihm und erbarme dich seiner, und gewähre ihm Wohlbefinden und verzeih ihm. Ehre seine Unterkunft und erweitere seinen Eingang, und wasche ihn mit Wasser, Schnee und Hagel, und reinige ihn von Sünden, wie Du das weiße Gewand von Schmutz gereinigt hast. Und ersetze sein Haus durch ein besseres Haus, und seine Familie durch eine bessere Familie, und seinen Ehepartner durch einen besseren Ehepartner. Lass ihn ins Paradies eintreten und schütze ihn vor der Strafe des Grabes und vor der Strafe des Feuers.", 
      Русский: "О Аллах, прости его и помилуй его, и даруй ему благополучие и прости его. Окажи ему почести и расширь его вход, и омой его водой, снегом и градом, и очисти его от грехов, как очистил Ты белую одежду от грязи. И замени его дом лучшим домом, и его семью лучшей семьёй, и его супругу лучшей супругой. Введи его в Рай и защити его от наказания могилы и от наказания Огня.", 
      Español: "Oh Allah, perdónalo y ten misericordia de él, y concédele bienestar y perdónalo. Honra su morada, y amplía su entrada, y lávalo con agua, nieve y granizo, y purifícalo de los pecados como purificaste la prenda blanca de la suciedad. Y reemplaza su hogar por un hogar mejor, y su familia por una familia mejor, y su cónyuge por un cónyuge mejor. Hazlo entrar al Paraíso y protégelo del castigo de la tumba y del castigo del Fuego.", 
      हिन्दी: "ऐ अल्लाह, इसे क्षमा कर और इस पर दया कर, और इसे आफ़ियत दे और इसे माफ़ कर दे। इसकी मेज़बानी का सम्मान कर, और इसके दाख़िल होने की जगह को वसीअ कर, और इसे पानी, बर्फ़ और ओलों से धो दे, और इसे गुनाहों से इस तरह पाक कर दे जैसे तूने सफ़ेद कपड़े को गंदगी से पाक किया। और इसे इसके घर से बेहतर घर दे, और इसके परिवार से बेहतर परिवार दे, और इसकी पत्नी से बेहतर पत्नी दे। इसे जन्नत में दाख़िल कर और क़ब्र के अज़ाब और आग के अज़ाब से बचा।", 
      Indonesia: "Ya Allah, ampunilah dia dan rahmatilah dia, dan berikanlah dia kesejahteraan dan maafkanlah dia. Muliakanlah tempat tinggalnya, dan luaskanlah tempat masuknya, dan basuhlah dia dengan air, salju dan hujan es, dan bersihkanlah dia dari dosa-dosa sebagaimana Engkau membersihkan pakaian putih dari kotoran. Dan gantikanlah rumahnya dengan rumah yang lebih baik, dan keluarganya dengan keluarga yang lebih baik, dan pasangannya dengan pasangan yang lebih baik. Masukkanlah dia ke dalam surga dan lindungilah dia dari siksa kubur dan dari siksa neraka." 
    } 
  },
  { 
    title: { English: "Fourth Takbeer - Dua for all Muslims", العربية: "التكبيرة الرابعة - الدعاء لعموم المسلمين", اردو: "چوتھی تکبیر - تمام مسلمانوں کے لیے دعا", Français: "Quatrième Takbir - Invocation pour tous les musulmans", Deutsch: "Vierter Takbir - Bittgebet für alle Muslime", Русский: "Четвёртый такбир - Мольба за всех мусульман", Español: "Cuarto Takbir - Súplica por todos los musulmanes", हिन्दी: "चौथी तकबीर - सभी मुसलमानों के लिए दुआ", Indonesia: "Takbir Keempat - Doa untuk seluruh kaum muslimin" },
    icon: "🌍",
    arabic: "اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا، وَشَاهِدِنَا وَغَائِبِنَا، وَصَغِيرِنَا وَكَبِيرِنَا، وَذَكَرِنَا وَأُنْثَانَا، اللَّهُمَّ مَنْ أَحْيَيْتَهُ مِنَّا فَأَحْيِهِ عَلَى الْإِسْلَامِ، وَمَنْ تَوَفَّيْتَهُ مِنَّا فَتَوَفَّهُ عَلَى الْإِيمَانِ، اللَّهُمَّ لَا تَحْرِمْنَا أَجْرَهُ، وَلَا تُضِلَّنَا بَعْدَهُ", 
    translit: "Allahumma-ghfir lihayyina wa mayyitina, wa shahidina wa gha'ibina, wa saghirina wa kabirina, wa dhakarina wa unthana. Allahumma man ahyaytahu minna fa'ahyihi 'alal-Islam, wa man tawaffaytahu minna fatawaffahu 'alal-iman. Allahumma la tahrimna ajrahu, wa la tudillana ba'dahu", 
    translations: { 
      English: "O Allah, forgive our living and our dead, our present and our absent, our young and our old, our males and our females. O Allah, whoever You keep alive from among us, keep him alive upon Islam, and whoever You cause to die from among us, cause him to die upon faith. O Allah, do not deprive us of his reward, and do not let us go astray after him.", 
      العربية: "اللهم اغفر لحينا وميتنا، وشاهدنا وغائبنا، وصغيرنا وكبيرنا، وذكرنا وأنثانا. اللهم من أحييته منا فأحيه على الإسلام، ومن توفيته منا فتوفه على الإيمان. اللهم لا تحرمنا أجره، ولا تضلنا بعده.", 
      Français: "Ô Allah, pardonne nos vivants et nos morts, nos présents et nos absents, nos petits et nos grands, nos mâles et nos femelles. Ô Allah, celui d'entre nous que Tu maintiens en vie, maintiens-le en vie sur l'Islam, et celui d'entre nous que Tu fais mourir, fais-le mourir sur la foi. Ô Allah, ne nous prive pas de sa récompense, et ne nous égare pas après lui.", 
      اردو: "اے اللہ! ہمارے زندوں اور ہمارے مردوں کو، ہمارے حاضر اور ہمارے غائب کو، ہمارے چھوٹے اور ہمارے بڑے کو، ہمارے مردوں اور ہماری عورتوں کو بخش دے۔ اے اللہ! ہم میں سے جسے تو زندہ رکھے اسے اسلام پر زندہ رکھ، اور ہم میں سے جسے تو وفات دے اسے ایمان پر وفات دے۔ اے اللہ! ہمیں اس کے اجر سے محروم نہ کر، اور اس کے بعد ہمیں گمراہ نہ کر۔", 
      Deutsch: "O Allah, vergib unseren Lebenden und unseren Toten, unseren Anwesenden und unseren Abwesenden, unseren Jungen und unseren Alten, unseren Männern und unseren Frauen. O Allah, wen von uns Du am Leben erhältst, den erhalte am Leben auf dem Islam, und wen von uns Du sterben lässt, den lasse sterben auf dem Glauben. O Allah, beraube uns nicht seines Lohnes, und lass uns nach ihm nicht irregehen.", 
      Русский: "О Аллах, прости наших живых и наших мёртвых, наших присутствующих и наших отсутствующих, наших малых и наших старых, наших мужчин и наших женщин. О Аллах, кого из нас Ты оставишь в живых, того оставь в живых на Исламе, а кого из нас Ты упокоишь, того упокой на вере. О Аллах, не лиши нас награды за него и не введи нас в заблуждение после него.", 
      Español: "Oh Allah, perdona a nuestros vivos y a nuestros muertos, a nuestros presentes y a nuestros ausentes, a nuestros pequeños y a nuestros mayores, a nuestros hombres y a nuestras mujeres. Oh Allah, a quien de nosotros mantengas con vida, mantenlo con vida sobre el Islam, y a quien de nosotros hagas morir, hazlo morir sobre la fe. Oh Allah, no nos prives de su recompensa, y no nos desvíes después de él.", 
      हिन्दी: "ऐ अल्लाह, हमारे ज़िंदों और हमारे मुर्दों को, हमारे हाज़िर और हमारे ग़ायब को, हमारे छोटे और हमारे बड़े को, हमारे मर्दों और हमारी औरतों को बख़्श दे। ऐ अल्लाह, हम में से जिसे तू ज़िंदा रखे उसे इस्लाम पर ज़िंदा रख, और हम में से जिसे तू मौत दे उसे ईमान पर मौत दे। ऐ अल्लाह, हमें उसके अज्र से महरूम न कर, और उसके बाद हमें गुमराह न कर।", 
      Indonesia: "Ya Allah, ampunilah orang-orang yang masih hidup di antara kami dan yang telah wafat, yang hadir dan yang tidak hadir, yang kecil dan yang besar, laki-laki dan perempuan kami. Ya Allah, siapa yang Engkau hidupkan di antara kami, maka hidupkanlah dia di atas Islam, dan siapa yang Engkau wafatkan di antara kami, maka wafatkanlah dia di atas iman. Ya Allah, janganlah Engkau halangi kami dari pahalanya, dan janganlah Engkau sesatkan kami setelahnya." 
    } 
  }
];

/* ==========================================================================
   قاموس واجهة المستخدم وترجماته الشاملة (UI Map - 9 Languages)
   ========================================================================== */
const uiMap = {
  // شاشة البداية ونظام التحديثات
  splashAppTitle: { English: "Janazah Guide", العربية: "دليل الجنازة", اردو: "نمازِ جنازہ گائیڈ", Français: "Guide Janazah", Deutsch: "Janazah-Leitfaden", Русский: "Гид Джаназа", Español: "Guía Janazah", हिन्दी: "जनाज़ा गाइड", Indonesia: "Panduan Jenazah" },
  splashAppSubtitle: { English: "Funeral Prayer Step-by-Step Guide & Rulings", العربية: "صفة صلاة الجنازة وأحكامها", اردو: "نمازِ جنازہ کا طریقہ اور احکام", Français: "Guide et règles de la prière funéraire", Deutsch: "Anleitung & Regeln zum Totengebet", Русский: "Порядок и правила заупокойной молитвы", Español: "Guía y normas de la oración fúnebre", हिन्दी: "नमाज़-ए-जनाज़ा का तरीक़ा और अहकाम", Indonesia: "Tata Cara & Hukum Shalat Jenazah" },
  checkingUpdates: { English: "Checking for updates...", العربية: "جاري التحقق من التحديثات...", اردو: "اپ ڈیٹس چیک کی جا رہی ہیں...", Français: "Vérification des mises à jour...", Deutsch: "Suche nach Updates...", Русский: "Проверка обновлений...", Español: "Buscando actualizaciones...", हिन्दी: "अपडेट की जाँच हो रही है...", Indonesia: "Memeriksa pembaruan..." },
  updateAvailableTitle: { English: "New Update Available", العربية: "تحديث جديد متوفر", اردو: "نئی اپ ڈیٹ دستیاب ہے", Français: "Nouvelle mise à jour disponible", Deutsch: "Neues Update verfügbar", Русский: "Доступно обновление", Español: "Nueva actualización disponible", हिन्दी: "नया अपडेट उपलब्ध है", Indonesia: "Pembaruan Baru Tersedia" },
  updateAvailableDesc: { English: "A newer, more stable version of Janazah Guide is available on Google Play Store.", العربية: "يتوفر إصدار أحدث وأكثر استقراراً من تطبيق دليل الجنازة على متجر Google Play.", اردو: "گوگل پلے اسٹور پر جنازہ گائیڈ کا نیا اور بہتر ورژن دستیاب ہے۔", Français: "Une version plus récente et plus stable est disponible sur Google Play.", Deutsch: "Eine neuere, stabilere Version ist im Google Play Store verfügbar.", Русский: "В Google Play доступна более новая и стабильная версия приложения.", Español: "Hay una versión más reciente y estable disponible en Google Play.", हिन्दी: "Google Play पर जनाज़ा गाइड का नया और बेहतर संस्करण उपलब्ध है।", Indonesia: "Versi terbaru dan lebih stabil tersedia di Google Play Store." },
  updateNowBtn: { English: "Update Now", العربية: "تحديث الآن", اردو: "ابھی اپ ڈیٹ کریں", Français: "Mettre à jour", Deutsch: "Jetzt aktualisieren", Русский: "Обновить сейчас", Español: "Actualizar ahora", हिन्दी: "अभी अपडेट करें", Indonesia: "Perbarui Sekarang" },
  updateLaterBtn: { English: "Later", العربية: "لاحقاً", اردو: "بعد میں", Français: "Plus tard", Deutsch: "Später", Русский: "Позже", Español: "Más tarde", हिन्दी: "बाद में", Indonesia: "Nanti" },

  // التبويبات الرئيسية والعناوين
  guide: { English: "Guide", العربية: "الدليل", اردو: "رہنما", Français: "Guide", Deutsch: "Leitfaden", Русский: "Руководство", Español: "Guía", हिन्दी: "मार्गदर्शिका", Indonesia: "Panduan" },
  extras: { English: "Extras", العربية: "الإضافات", اردو: "اضافی", Français: "Extra", Deutsch: "Extras", Русский: "Дополнительно", Español: "Extras", हिन्दी: "अतिरिक्त", Indonesia: "Tambahan" },
  settings: { English: "Settings", العربية: "الإعدادات", اردو: "ترتیبات", Français: "Paramètres", Deutsch: "Einstellungen", Русский: "Настройки", Español: "Ajustes", हिन्दी: "सेटिंग्स", Indonesia: "Pengaturan" },
  language: { English: "Language", العربية: "اللغة", اردو: "زبان", Français: "Langue", Deutsch: "Sprache", Русский: "Язык", Español: "Idioma", हिन्दी: "भाषा", Indonesia: "Bahasa" },

  // الخطوط والمظهر والألوان
  fontSize: { English: "Font Size", العربية: "حجم الخط", اردو: "فونٹ سائز", Français: "Taille de police", Deutsch: "Schriftgröße", Русский: "Размер шрифта", Español: "Tamaño de fuente", हिन्दी: "फ़ॉन्ट आकार", Indonesia: "Ukuran Font" },
  customizeTextSizesBtn: { English: "Customize Text Sizes", العربية: "تخصيص أحجام النصوص", اردو: "متن کے سائز کی تخصیص", Français: "Personnaliser la taille des textes", Deutsch: "Textgrößen anpassen", Русский: "Настроить размер текста", Español: "Personalizar tamaños de texto", हिन्दी: "टेक्स्ट आकार कस्टमाइज़ करें", Indonesia: "Sesuaikan Ukuran Teks" },
  swipeToPreviewHint: { English: "Swipe cards to preview text sizes", العربية: "اسحب البطاقة لمعاينة النصوص", اردو: "متن دیکھنے کے لیے کارڈ سوائپ کریں", Français: "Glissez la carte pour prévisualiser", Deutsch: "Karte wischen zur Vorschau", Русский: "Смахните карточку для просмотра", Español: "Desliza la tarjeta para previsualizar", हिन्दी: "पूर्वावलोकन के लिए कार्ड स्वाइप करें", Indonesia: "Usap kartu untuk pratinjau teks" },
  fontNotice: {
    English: "Font size changes prominently within supplications and guide, staying balanced in UI.",
    العربية: "يتغير حجم الخط بوضوح داخل الأدعية والدليل، ويبقى متزناً في الواجهة للحفاظ على الشاشة.",
    اردو: "دعاؤں اور رہنما میں فونٹ سائز نمایاں طور پر تبدیل ہوتا ہے جبکہ انٹرفیس متوازن رہتا ہے۔",
    Français: "La taille varie nettement dans les invocations tout en restant équilibrée dans l'interface.",
    Deutsch: "Schriftgröße ändert sich deutlich in Bittgebeten, bleibt im UI ausgewogen.",
    Русский: "Размер шрифта заметно меняется в мольбах, оставаясь стабильным в интерфейсе.",
    Español: "El tamaño cambia con claridad en las súplicas y se mantiene equilibrado en la interfaz.",
    हिन्दी: "दुआओं में फ़ॉन्ट आकार साफ़ बदलता है और इंटरफ़ेस संतुलित रहता है।",
    Indonesia: "Ukuran font berubah jelas pada doa-doa dan tetap seimbang di tampilan antarmuka."
  },
  themeModeTitle: { English: "Theme Mode", العربية: "وضع المظهر", اردو: "تھيم موڈ", Français: "Mode de thème", Deutsch: "Design-Modus", Русский: "Режим темы", Español: "Modo de tema", हिन्दी: "थीम मोड", Indonesia: "Mode Tema" },
  small: { English: "Small", العربية: "صغير", اردو: "چھوٹا", Français: "Petit", Deutsch: "Klein", Русский: "Маленький", Español: "Pequeño", हिन्दी: "छोटा", Indonesia: "Kecil" },
  medium: { English: "Medium", العربية: "متوسط", اردو: "درمیانہ", Français: "Moyen", Deutsch: "Mittel", Русский: "Средний", Español: "Mediano", हिन्दी: "मध्यम", Indonesia: "Sedang" },
  large: { English: "Large", العربية: "كبير", اردو: "بڑا", Français: "Grand", Deutsch: "Groß", Русский: "Большой", Español: "Grande", हिन्दी: "बड़ा", Indonesia: "Besar" },
  huge: { English: "Huge", العربية: "ضخم", اردو: "بہت بڑا", Français: "Très grand", Deutsch: "Sehr groß", Русский: "Очень большой", Español: "Muy grande", हिन्दी: "विशाल", Indonesia: "Sangat Besar" },
  lightTheme: { English: "Light", العربية: "فاتح", اردو: "روشن", Français: "Clair", Deutsch: "Hell", Русский: "Светлый", Español: "Claro", हिन्दी: "हल्का", Indonesia: "Terang" },
  darkTheme: { English: "Dark", العربية: "داكن", اردو: "تاریک", Français: "Sombre", Deutsch: "Dunkel", Русский: "Тёмный", Español: "Oscuro", हिन्दी: "गहरा", Indonesia: "Gelap" },
  autoTheme: { English: "Auto", العربية: "تلقائي", اردو: "خودکار", Français: "Automatique", Deutsch: "Automatisch", Русский: "Автоматически", Español: "Automático", हिन्दी: "स्वचालित", Indonesia: "Otomatis" },
  accentLabel: { English: "Accent Color", العربية: "اللون المميز", اردو: "نمایاں رنگ", Français: "Couleur d'accent", Deutsch: "Akzentfarbe", Русский: "Цвет темы", Español: "Color distintivo", हिन्दी: "थीम रंग", Indonesia: "Warna Tema" },
  additionalColorsBtn: { English: "Additional Colors", العربية: "ألوان إضافية", اردو: "مزید رنگ", Français: "Couleurs supplémentaires", Deutsch: "Zusätzliche Farben", Русский: "Дополнительные цвета", Español: "Colores adicionales", हिन्दी: "अतिरिक्त रंग", Indonesia: "Warna Tambahan" },
  twoHundredColorsBadge: { English: "200 Colors", العربية: "200 لون", اردو: "200 رنگ", Français: "200 Couleurs", Deutsch: "200 Farben", Русский: "200 цветов", Español: "200 Colores", हिन्दी: "200 रंग", Indonesia: "200 Warna" },

  // التهيئة والمشاركة
  continueBtn: { English: "Continue →", العربية: "متابعة ←", اردو: "جاری رکھیں ←", Français: "Continuer →", Deutsch: "Weiter →", Русский: "Продолжить →", Español: "Continuar →", हिन्दी: "जारी रखें →", Indonesia: "Lanjutkan →" },
  dontAskAgain: { English: "Don't ask me again", العربية: "عدم السؤال مرة أخرى", اردو: "مجھ سے دوبارہ مت پوچھیں", Français: "Ne plus me demander", Deutsch: "Nicht mehr fragen", Русский: "Больше не спрашивать", Español: "No volver a preguntar", हिन्दी: "मुझसे दोबारा न पूछें", Indonesia: "Jangan tanya saya lagi" },
  startApp: { English: "Start App", العربية: "ابدأ التطبيق", اردو: "ایپ شروع کریں", Français: "Démarrer", Deutsch: "App starten", Русский: "Начать работу", Español: "Iniciar aplicación", हिन्दी: "ऐप शुरू करें", Indonesia: "Mulai Aplikasi" },
  close: { English: "Close", العربية: "إغلاق", اردو: "بند کریں", Français: "Fermer", Deutsch: "Schließen", Русский: "Закрыть", Español: "Cerrar", हिन्दी: "बंद करें", Indonesia: "Tutup" },
  shareLabel: { English: "QR Code", العربية: "رمز QR", اردو: "QR کوڈ", Français: "Code QR", Deutsch: "QR-Code", Русский: "QR-код", Español: "Código QR", हिन्दी: "QR कोड", Indonesia: "Kode QR" },
  shareReward: { English: "Share the Reward", العربية: "شارك الأجر", اردو: "ثواب شیئر کریں", Français: "Partager la récompense", Deutsch: "Belohnung teilen", Русский: "Поделиться наградой", Español: "Compartir recompensa", हिन्दी: "सवाब साझा करें", Indonesia: "Bagikan Kebaikan" },
  qrSubText: { English: "Scan code to share Janazah Guide and gain reward", العربية: "امسح الرمز لنشر تطبيق دليل الجنازة ونيل الأجر", اردو: "ایپ شیئر کرنے اور ثواب حاصل کرنے کے لیے اسکین کریں", Français: "Scannez pour partager l'application et obtenir la récompense", Deutsch: "Scannen, um die App zu teilen und Belohnung zu erhalten", Русский: "Отсканируйте код, чтобы поделиться и получить награду", Español: "Escanea el código para compartir la app y ganar recompensa", हिन्दी: "ऐप साझा करने और सवाब पाने के लिए स्कैन करें", Indonesia: "Pindai kode untuk membagikan aplikasi dan meraih pahala" },
  selectLangTitle: { English: "Select Language", العربية: "اختر اللغة", اردو: "زبان منتخب کریں", Français: "Choisir la langue", Deutsch: "Sprache wählen", Русский: "Выберите язык", Español: "Seleccionar idioma", हिन्दी: "भाषा चुनें", Indonesia: "Pilih Bahasa" },
  chooseThemeTitle: { English: "Choose Theme Color", العربية: "اختر اللون المميز", اردو: "نمایاں رنگ منتخب کریں", Français: "Choisir la couleur", Deutsch: "Akzentfarbe wählen", Русский: "Выберите цвет", Español: "Elegir color distintivo", हिन्दी: "थीम रंग चुनें", Indonesia: "Pilih Warna Tema" },
  chooseThemeSub: { English: "Select your preferred interface color", العربية: "اختر اللون المفضل لواجهة التطبيق", اردو: "ایپ انٹرفیس کے لیے پسندیدہ رنگ منتخب کریں", Français: "Choisissez votre couleur préférée", Deutsch: "Wählen Sie Ihre bevorzugte Farbe", Русский: "Выберите желаемый цвет интерфейса", Español: "Selecciona el color preferido", हिन्दी: "पसंदीदा इंटरफ़ेस रंग चुनें", Indonesia: "Pilih warna antarmuka favorit Anda" },

  // وسائل التقليب والحساسية والتخصيص الحي للأزرار
  navControlsTitle: { English: "Navigation Methods", العربية: "طرق التقليب والتنقل", اردو: "نیویگیشن کے طریقے", Français: "Modes de défilement", Deutsch: "Navigationsmethoden", Русский: "Способы перелистывания", Español: "Métodos de navegación", हिन्दी: "नेविगेशन के तरीके", Indonesia: "Metode Navigasi" },
  swipeNav: { English: "Swipe Gestures", العربية: "التقليب بسحب الشاشة", اردو: "اسکرین سوائپ", Français: "Balayage tactile", Deutsch: "Wischgesten", Русский: "Жесты смахивания", Español: "Deslizamiento táctil", हिन्दी: "स्क्रीन स्वाइप", Indonesia: "Usap Layar" },
  shakeNav: { English: "Shake Motion", العربية: "التقليب باهتزاز الجهاز", اردو: "فون ہلانے پر", Français: "Secousse de l'appareil", Deutsch: "Geräteschütteln", Русский: "Встряхивание устройства", Español: "Agitar el dispositivo", हिन्दी: "डिवाइस हिलाकर", Indonesia: "Guncang Perangkat" },
  shakeForceRequired: { English: "Required Shake Force", العربية: "قوة الاهتزاز المطلوبة", اردو: "ہلانے کی مطلوبہ قوت", Français: "Force de secousse requise", Deutsch: "Erforderliche Schüttelstärke", Русский: "Сила встряхивания", Español: "Fuerza de agitación requerida", हिन्दी: "आवश्यक हिलाने की शक्ति", Indonesia: "Kekuatan Guncangan" },
  shakeVeryEasy: { English: "Easier / Ultra Sensitive", العربية: "أسهل / فائق الحساسية", اردو: "آسان / انتہائی حساس", Français: "Plus facile / Très sensible", Deutsch: "Leichter / Sehr empfindlich", Русский: "Легче / Высокая чувств.", Español: "Más fácil / Muy sensible", हिन्दी: "आसान / अति संवेदनशील", Indonesia: "Lebih Mudah / Sangat Sensitif" },
  shakeModerate: { English: "Moderate", العربية: "معتدل", اردو: "معتدل", Français: "Modéré", Deutsch: "Mittel", Русский: "Умеренно", Español: "Moderado", हिन्दी: "सामान्य", Indonesia: "Sedang" },
  shakeFirm: { English: "Firm", العربية: "قوي", اردو: "مضبوط", Français: "Ferme", Deutsch: "Stark", Русский: "Сильно", Español: "Firme", हिन्दी: "मज़बूत", Indonesia: "Kuat" },
  voiceNav: { English: "Voice Recognition", العربية: "التقليب بالصوت", اردو: "آوازی نیویگیشن", Français: "Reconnaissance vocale", Deutsch: "Spracherkennung", Русский: "Голосовое управление", Español: "Reconocimiento de voz", हिन्दी: "आवाज़ द्वारा", Indonesia: "Perintah Suara" },
  buttonsNav: { English: "On-Screen Buttons", العربية: "التقليب بأزرار الشاشة", اردو: "اسکرین بٹن", Français: "Boutons à l'écran", Deutsch: "Bildschirmtasten", Русский: "Кнопки на экране", Español: "Botones en pantalla", हिन्दी: "स्क्रीन बटन", Indonesia: "Tombol Layar" },
  customizeButtons: { English: "Live Buttons Customizer", العربية: "المعاينة والتخصيص الحي للأزرار", اردو: "بٹنوں کی لائیو ترتیب", Français: "Personnalisation en direct des boutons", Deutsch: "Live-Tastenanpassung", Русский: "Живая настройка кнопок", Español: "Personalización en vivo de botones", हिन्दी: "लाइव बटन कस्टमाइज़र", Indonesia: "Kustomisasi Tombol Langsung" },
  takbeerStepLabel: { English: "Takbeer", العربية: "التكبيرة", اردو: "تکبیر", Français: "Takbir", Deutsch: "Takbir", Русский: "Такбир", Español: "Takbir", हिन्दी: "तकबीर", Indonesia: "Takbir" },
  saveAndNextStepBtn: { English: "Save & Next Takbeer ❯", العربية: "حفظ والانتقال للتالية ❯", اردو: "محفوظ کریں اور اگلی تکبیر ❯", Français: "Enregistrer et suivant ❯", Deutsch: "Speichern & Nächster ❯", Русский: "Сохранить и далее ❯", Español: "Guardar y siguiente ❯", हिन्दी: "सेव करें और अगला ❯", Indonesia: "Simpan & Berikutnya ❯" },
  saveAndExitBtn: { English: "Save & Exit ✓", العربية: "حفظ وخروج ✓", اردو: "محفوظ کریں اور باہر نکلیں ✓", Français: "Enregistrer et quitter ✓", Deutsch: "Speichern & Beenden ✓", Русский: "Сохранить и выйти ✓", Español: "Guardar y salir ✓", हिन्दी: "सेव करें और बाहर निकलें ✓", Indonesia: "Simpan & Keluar ✓" },
  buttonStyleLabel: { English: "Button Layout Style", العربية: "نمط ظهور الأزرار", اردو: "بٹنوں کا انداز", Français: "Style des boutons", Deutsch: "Tasten-Layout", Русский: "Стиль кнопок", Español: "Estilo de botones", हिन्दी: "बटन लेआउट शैली", Indonesia: "Gaya Tata Letak Tombol" },
  singleForwardBtn: { English: "Single Next Button", العربية: "زر تقدم واحد", اردو: "ایک اگلا بٹن", Français: "Bouton unique suivant", Deutsch: "Einzelne Weiter-Taste", Русский: "Одна кнопка вперёд", Español: "Un botón de avance", हिन्दी: "एकल अगला बटन", Indonesia: "Satu Tombol Lanjut" },
  dualPrevNextBtn: { English: "Dual (Prev / Next)", العربية: "زرين (سابق / تالي)", اردو: "دو بٹن (پچھلا / اگلا)", Français: "Deux boutons (Préc / Suiv)", Deutsch: "Zwei Tasten (Zurück / Weiter)", Русский: "Две кнопки (Назад / Далее)", Español: "Dos botones (Ant / Sig)", हिन्दी: "दो बटन (पिछला / अगला)", Indonesia: "Dua Tombol (Sblm / Lanjut)" },
  lockDualButtonsLabel: { English: "Move both buttons together (uncheck to drag each separately)", العربية: "تحريك الزرين معاً ككتلة واحدة (إلغاء القفل لتحريك كل زر بمفرده)", اردو: "دونوں بٹن ایک ساتھ ہلائیں (الگ ہلانے کے لیے ان چیک کریں)", Français: "Déplacer les deux ensemble (décocher pour séparer)", Deutsch: "Beide zusammen bewegen (deaktivieren für einzeln)", Русский: "Двигать вместе (снимите галочку для раздельного)", Español: "Mover ambos juntos (desmarcar para separar)", हिन्दी: "दोनों बटन साथ चलाएं (अलग करने के लिए अनचेक करें)", Indonesia: "Geser kedua tombol bersamaan (hapus centang untuk pisah)" },
  scaleLabel: { English: "Scale", العربية: "الحجم", اردو: "سائز", Français: "Taille", Deutsch: "Größe", Русский: "Размер", Español: "Tamaño", हिन्दी: "आकार", Indonesia: "Ukuran" },
  opacityLabel: { English: "Opacity", العربية: "الشفافية", اردو: "شفافیت", Français: "Opacité", Deutsch: "Transparenz", Русский: "Прозрачность", Español: "Opacidad", हिन्दी: "पारदर्शिता", Indonesia: "Transparansi" },
  perStepPosLabel: { English: "Customize position per Takbeer", العربية: "تخصيص الموضع لكل تكبيرة على حدة", اردو: "ہر تکبیر کے لیے الگ جگہ", Français: "Position par Takbir", Deutsch: "Position pro Takbir", Русский: "Позиция для каждого такбира", Español: "Posición por Takbir", हिन्दी: "प्रत्येक तकबीर के लिए अलग स्थान", Indonesia: "Posisi khusus tiap Takbir" },
  resetDefaultBtn: { English: "Reset Default", العربية: "استعادة الافتراضي", اردو: "ڈیفالٹ بحال کریں", Français: "Réinitialiser", Deutsch: "Zurücksetzen", Русский: "Сбросить", Español: "Restablecer", हिन्दी: "डिफ़ॉल्ट रीसेट करें", Indonesia: "Atur Ulang" },
  voiceAutoEnd: { English: "Auto-End Prayer upon Tasleem", العربية: "الإنهاء التلقائي عند التسليم", اردو: "سلام پر خودکار اختتام", Français: "Fin automatique au salut final", Deutsch: "Automatisches Beenden beim Friedensgruß", Русский: "Автозавершение при таслиме", Español: "Finalizar automáticamente al dar el salam", हिन्दी: "सलाम पर स्वतः समाप्ति", Indonesia: "Selesai Otomatis Saat Salam" },

  // شاشة الصلاة والأدعية
  startPrayerBtn: { English: "Start Funeral Prayer", العربية: "ابدأ صلاة الجنازة", اردو: "نمازِ جنازہ شروع کریں", Français: "Démarrer la prière funéraire", Deutsch: "Totengebet beginnen", Русский: "Начать заупокойную молитву", Español: "Iniciar oración fúnebre", हिन्दी: "नमाज़-ए-जनाज़ा शुरू करें", Indonesia: "Mulai Shalat Jenazah" },
  startScreenDesc: { English: "Interactive step-by-step 4-Takbeer guide with touch, voice, and motion controls.", العربية: "دليل تفاعلي متزامن خطوة بخطوة مع أربع تكبيرات، يدعم التبديل اللمسي والصوتي والحركي.", اردو: "چار تکبیروں کا مکمل اور مرحلہ وار رہنما۔ سینسرز صرف نماز کے دوران کام کریں گے۔", Français: "Guide interactif étape par étape avec 4 takbirs.", Deutsch: "Interaktiver Leitfaden mit 4 Takbiren.", Русский: "Пошаговое интерактивное руководство из 4 такбиров.", Español: "Guía interactiva paso a paso de 4 takbirat.", हिन्दी: "4 तकबीरों का चरणबद्ध गाइड।", Indonesia: "Panduan interaktif 4 takbir langkah demi langkah." },
  exitPrayer: { English: "End Prayer", العربية: "إنهاء الصلاة", اردو: "نماز ختم کریں", Français: "Terminer la prière", Deutsch: "Gebet beenden", Русский: "Завершить молитву", Español: "Finalizar oración", हिन्दी: "नमाज़ समाप्त करें", Indonesia: "Akhiri Shalat" },
  prayerCompleted: { English: "May Allah accept - Prayer completed", العربية: "تقبل الله - تم إنهاء الصلاة", اردو: "اللہ قبول فرمائے - نماز مکمل ہوئی", Français: "Qu'Allah accepte - Prière terminée", Deutsch: "Möge Allah annehmen - Gebet beendet", Русский: "Да примет Аллах - Молитва завершена", Español: "Que Alá acepte - Oración finalizada", हिन्दी: "अल्लाह क़बूल फरमाए - नमाज़ पूरी हुई", Indonesia: "Semoga Allah menerima - Shalat selesai" },
  nextTakbeer: { English: "Next Takbeer ❯", العربية: "التكبيرة التالية ❯", اردو: "اگلی تکبیر ❯", Français: "Takbir suivant ❯", Deutsch: "Nächster Takbir ❯", Русский: "Следующий такбир ❯", Español: "Siguiente Takbir ❯", हिन्दी: "अगली तकबीर ❯", Indonesia: "Takbir Selanjutnya ❯" },
  adhkarAndDuas: { English: "Adhkar & Supplications", العربية: "الأذكار والأدعية", اردو: "اذکار اور دعائیں", Français: "Invocations et rappels", Deutsch: "Bittgebete & Adhkar", Русский: "Азкары и дуа", Español: "Adhkar y súplicas", हिन्दी: "अज़कार और दुआएं", Indonesia: "Dzikir & Doa" },
  adhkarSub: { English: "Duas for the deceased, funeral sunnahs, authentic adhkar", العربية: "أدعية المتوفى، سنن وآداب الجنائز، أذكار عامة مأثورة", اردو: "میت کی دعائیں، جنازے کی سنتیں، ماثور اذکار", Français: "Invocations pour le défunt, sunnahs mortuaires, adhkar", Deutsch: "Bittgebete für Verstorbene, Sunnahs, authentische Adhkar", Русский: "Мольбы за умершего, сунны похорон, достоверные азкары", Español: "Súplicas por el difunto, sunnahs, adhkar auténticos", हिन्दी: "मृतक की दुआएं, जनाज़े की सुन्नतें, मसनून अज़कार", Indonesia: "Doa jenazah, sunnah janazah, dzikir shahih" },
  backBtn: { English: "❮ Back", العربية: "❮ عودة", اردو: "❮ واپسی", Français: "❮ Retour", Deutsch: "❮ Zurück", Русский: "❮ Назад", Español: "❮ Volver", हिन्दी: "❮ वापस", Indonesia: "❮ Kembali" },
  understood: { English: "Understood", العربية: "فهمت ذلك", اردو: "سمجھ گیا", Français: "Compris", Deutsch: "Verstanden", Русский: "Понятно", Español: "Entendido", हिन्दी: "समझ गया", Indonesia: "Dimengerti" },
  mustKeepOneNav: {
    English: "At least one navigation method must remain active to operate the guide.",
    العربية: "يجب تفعيل طريقة تقليب واحدة على الأقل لضمان عمل الدليل",
    اردو: "رہنما کو چلانے کے لیے کم از کم ایک نیویگیشن طریقہ فعال رہنا چاہیے۔",
    Français: "Au moins un mode de défilement doit rester activé.",
    Deutsch: "Mindestens eine Navigationsmethode muss aktiv bleiben.",
    Русский: "Необходимо оставить хотя бы один способ перелистывания.",
    Español: "Debe mantener activado al menos un método de navegación.",
    हिन्दी: "गाइड चलाने के लिए कम से कम एक तरीका सक्रिय रहना चाहिए।",
    Indonesia: "Minimal satu metode navigasi harus tetap aktif agar panduan berfungsi."
  },

  // السبحة الإلكترونية المبتكرة والأهداف المخصصة وقائمة أهدافي
  tasbeehOfficialTitle: { English: "Electronic Tasbeeh", العربية: "السبحة الإلكترونية", اردو: "الیکٹرانک تسبیح", Français: "Chapelet Électronique", Deutsch: "Elektronische Gebetskette", Русский: "Электронный тасбих", Español: "Tasbih Electrónico", हिन्दी: "इलेक्ट्रॉनिक तस्बीह", Indonesia: "Tasbih Elektronik" },
  tasbeehOfficialSub: { English: "Full-screen view, smart counter, custom goals & floating widget", العربية: "شاشة كاملة منفصلة، عداد ذكي، أهداف مخصصة ونافذة عائمة", اردو: "مکمل اسکرین، اسمارٹ کاؤنٹر، مخصوص اہداف اور تیرتا ویجٹ", Français: "Plein écran, compteur intelligent, objectifs et widget flottant", Deutsch: "Vollbild, Zähler, eigene Ziele & schwebendes Widget", Русский: "Полный экран, счётчик, свои цели и плавающий виджет", Español: "Pantalla completa, metas personalizadas y widget flotante", हिन्दी: "फुल स्क्रीन, स्मार्ट काउंटर, कस्टम लक्ष्य और फ्लोटिंग विजेट", Indonesia: "Layar penuh, penghitung cerdas, target khusus & widget" },
  minimizeBtn: { English: "Minimize", العربية: "تصغير", اردو: "چھوٹا کریں", Français: "Réduire", Deutsch: "Minimieren", Русский: "Свернуть", Español: "Minimizar", हिन्दी: "छोटा करें", Indonesia: "Kecilkan" },
  pipBtnLabel: { English: "Floating PiP", العربية: "عائم خارجي", اردو: "بیرونی ونڈو", Français: "Fenêtre PiP", Deutsch: "Schwebefenster", Русский: "Поверх окон", Español: "Ventana PiP", हिन्दी: "फ्लोटिंग PiP", Indonesia: "Jendela PiP" },
  targetLabel: { English: "Goal", العربية: "الهدف", اردو: "ہدف", Français: "Objectif", Deutsch: "Ziel", Русский: "Цель", Español: "Meta", हिन्दी: "लक्ष्य", Indonesia: "Target" },
  freeGoalMode: { English: "Free Mode", العربية: "الهدف الحر", اردو: "آزاد ہدف", Français: "Mode Libre", Deutsch: "Freier Modus", Русский: "Свободный режим", Español: "Modo Libre", हिन्दी: "मुक्त लक्ष्य", Indonesia: "Target Bebas" },
  setCustomGoalMode: { English: "Set Goal", العربية: "تحديد هدف", اردو: "ہدف مقرر کریں", Français: "Définir un objectif", Deutsch: "Ziel setzen", Русский: "Задать цель", Español: "Fijar meta", हिन्दी: "लक्ष्य चुनें", Indonesia: "Atur Target" },
  dhikrInputPlaceholder: { English: "Enter Dhikr (e.g. SubhanAllah)", العربية: "اكتب الذكر (مثل: سبحان الله)", اردو: "ذکر لکھیں (مثلاً سبحان اللہ)", Français: "Écrire le Dhikr (ex: SubhanAllah)", Deutsch: "Dhikr eingeben (z.B. SubhanAllah)", Русский: "Введите зикр (напр. СубханАллах)", Español: "Escribe el Dhikr (ej. SubhanAllah)", हिन्दी: "ज़िक्र लिखें (जैसे सुब्हानअल्लाह)", Indonesia: "Tulis Dzikir (mis. Subhanallah)" },
  targetCountPlaceholder: { English: "Count (e.g. 110)", العربية: "العدد (مثل: 110)", اردو: "تعداد (مثلاً 110)", Français: "Nombre (ex: 110)", Deutsch: "Anzahl (z.B. 110)", Русский: "Число (напр. 110)", Español: "Cantidad (ej. 110)", हिन्दी: "संख्या (जैसे 110)", Indonesia: "Jumlah (mis. 110)" },
  startCustomGoalBtn: { English: "Start Custom Goal", العربية: "بدء الهدف المخصص", اردو: "مخصوص ہدف شروع کریں", Français: "Démarrer l'objectif", Deutsch: "Eigenes Ziel starten", Русский: "Начать цель", Español: "Iniciar meta personalizada", हिन्दी: "कस्टम लक्ष्य शुरू करें", Indonesia: "Mulai Target Khusus" },
  enterValidGoalAlert: { English: "Please enter a Dhikr name and a valid number greater than zero", العربية: "يرجى كتابة اسم الذكر وتحديد عدد صحيح أكبر من صفر", اردو: "براہ کرم ذکر کا نام اور صفر سے بڑا عدد درج کریں", Français: "Veuillez saisir un Dhikr et un nombre supérieur à zéro", Deutsch: "Bitte Dhikr-Namen und eine Zahl größer als Null eingeben", Русский: "Введите название зикра и число больше нуля", Español: "Ingresa un Dhikr y un número mayor que cero", हिन्दी: "कृपया ज़िक्र का नाम और शून्य से बड़ी संख्या दर्ज करें", Indonesia: "Masukkan nama dzikir dan angka lebih dari nol" },
  goalCompletedSuccess: { English: "Goal Completed Successfully ✓", العربية: "تم إنهاء الهدف بنجاح ✓", اردو: "ہدف کامیابی سے مکمل ہو گیا ✓", Français: "Objectif terminé avec succès ✓", Deutsch: "Ziel erfolgreich abgeschlossen ✓", Русский: "Цель успешно достигнута ✓", Español: "Meta completada con éxito ✓", हिन्दी: "लक्ष्य सफलतापूर्वक पूरा हुआ ✓", Indonesia: "Target Berhasil Diselesaikan ✓" },
  myGoalsTitle: { English: "My Goals", العربية: "أهدافي", اردو: "میرے اہداف", Français: "Mes Objectifs", Deutsch: "Meine Ziele", Русский: "Мои цели", Español: "Mis Metas", हिन्दी: "मेरे लक्ष्य", Indonesia: "Target Saya" },
  noSavedGoalsYet: { English: "No completed goals yet. Set a goal and complete it to save it here.", العربية: "لا توجد أهداف مكتملة بعد. حدد هدفاً وأكمله ليُحفظ هنا.", اردو: "ابھی تک کوئی مکمل ہدف نہیں ہے۔ ہدف مقرر کریں اور مکمل کریں۔", Français: "Aucun objectif terminé pour le moment.", Deutsch: "Noch keine abgeschlossenen Ziele gespeichert.", Русский: "Пока нет завершённых целей. Задайте и выполните цель.", Español: "Aún no hay metas completadas.", हिन्दी: "अभी तक कोई पूरा किया गया लक्ष्य नहीं है।", Indonesia: "Belum ada target selesai. Atur & selesaikan target." },
  repeatGoalBtn: { English: "Repeat", العربية: "تكرار", اردو: "دہرائیں", Français: "Répéter", Deutsch: "Wiederholen", Русский: "Повторить", Español: "Repetir", हिन्दी: "दोहराएं", Indonesia: "Ulangi" },
  hapticFeedbackLabel: { English: "Haptic Vibration", العربية: "الاهتزاز اللمسي (Haptic)", اردو: "لمسی ارتعاش (Haptic)", Français: "Vibration tactile (Haptic)", Deutsch: "Haptisches Feedback", Русский: "Тактильная вибрация", Español: "Vibración háptica", हिन्दी: "स्पर्श कंपन (Haptic)", Indonesia: "Getaran Haptik" },
  ringSizeLabel: { English: "Tasbeeh Ring Size", العربية: "حجم حلقة التسبيح", اردو: "تسبیح کے دائرے کا سائز", Français: "Taille de l'anneau", Deutsch: "Ringgröße", Русский: "Размер кольца", Español: "Tamaño del anillo", हिन्दी: "तस्बीह रिंग का आकार", Indonesia: "Ukuran Lingkaran Tasbih" },
  resetCounterBtn: { English: "Reset Counter", العربية: "تصفير العداد", اردو: "کاؤنٹر صفر کریں", Français: "Réinitialiser le compteur", Deutsch: "Zähler zurücksetzen", Русский: "Сбросить счётчик", Español: "Reiniciar contador", हिन्दी: "काउंटर रीसेट करें", Indonesia: "Atur Ulang Penghitung" },
  tasbeehNotice: {
    English: "The counter automatically saves tasbeeh counts and custom targets even when the app is closed.",
    العربية: "يقوم العداد بحفظ أرقام التسبيح والأهداف تلقائياً حتى عند إغلاق التطبيق",
    اردو: "ایپ بند ہونے پر بھی کاؤنٹر تسبیحات اور اہداف کو خودکار طور پر محفوظ رکھتا ہے۔",
    Français: "Le compteur enregistre automatiquement les chiffres et objectifs même après fermeture.",
    Deutsch: "Der Zähler speichert Stände und Ziele automatisch, selbst beim Schließen der App.",
    Русский: "Счётчик автоматически сохраняет количество и цели даже при закрытии приложения.",
    Español: "El contador guarda automáticamente las cifras y metas incluso al cerrar la app.",
    हिन्दी: "ऐप बंद होने पर भी काउंटर तस्बीह संख्या और लक्ष्य को स्वतः सेव रखता है।",
    Indonesia: "Penghitung otomatis menyimpan angka dzikir dan target bahkan saat aplikasi ditutup."
  },

  // خيارات ظهور نصوص الدليل
  textDisplayOptions: { English: "Guide Text Display", العربية: "ظهور نصوص الدليل", اردو: "متن کے ظاہر ہونے کی ترتیبات", Français: "Affichage des textes", Deutsch: "Textanzeige des Leitfadens", Русский: "Отображение текстов", Español: "Visualización de textos", हिन्दी: "गाइड टेक्स्ट दृश्यता", Indonesia: "Tampilan Teks Panduan" },
  arabicScript: { English: "Arabic", العربية: "النص العربي", اردو: "عربی متن", Français: "Texte arabe", Deutsch: "Arabischer Text", Русский: "Арабский текст", Español: "Texto árabe", हिन्दी: "अरबी पाठ", Indonesia: "Teks Arab" },
  translitScript: { English: "Transliteration", العربية: "النطق اللاتيني", اردو: "رومن تلفظ", Français: "Translittération", Deutsch: "Transkription", Русский: "Транслитерация", Español: "Transliteración", हिन्दी: "रोमन उच्चारण", Indonesia: "Transliterasi" },
  meaningTrans: { English: "Translation", العربية: "الترجمة", اردو: "ترجمہ", Français: "Traduction", Deutsch: "Übersetzung", Русский: "Перевод", Español: "Traducción", हिन्दी: "अनुवाद", Indonesia: "Terjemahan" }
};

/* ==========================================================================
   الشروحات الكاملة والمترجمة لطرق التقليب لجميع اللغات الـ 9 المدعومة
   ========================================================================== */
const hintDetails = {
  swipe: {
    icon: "👆",
    title: {
      English: "Swipe Gestures",
      العربية: "التقليب بسحب الشاشة",
      اردو: "اسکرین سوائپ",
      Français: "Balayage tactile",
      Deutsch: "Wischgesten",
      Русский: "Жесты смахивания",
      Español: "Deslizamiento táctil",
      हिन्दी: "स्क्रीन स्वाइप",
      Indonesia: "Usap Layar"
    },
    desc: {
      English: "Swipe left or right across the card to navigate between Takbeers. Swiping right-to-left advances to the next step, while swiping left-to-right returns to previous. An extra forward swipe on the 4th Takbeer ends the prayer automatically.",
      العربية: "اسحب إصبعك عبر بطاقة التكبيرة للانتقال المباشر. السحب من اليمين لليسار ينتقل للتكبيرة التالية ومن اليسار لليمين يرجع للسابقة. السحب الإضافي للأمام بعد التكبيرة الرابعة ينهي جلسة الصلاة تلقائياً.",
      اردو: "تکبیر کے کارڈ پر انگلی سوائپ کر کے اگلی یا پچھلی تکبیر پر جائیں۔ چوتھی تکبیر کے بعد ایک اضافی سوائپ خودکار طور پر نماز ختم کر دے گا۔",
      Français: "Glissez votre doigt sur la carte pour passer d'un takbir à l'autre. Un glissement supplémentaire au 4ème takbir termine la prière.",
      Deutsch: "Wischen Sie über die Karte, um zwischen den Takbiren zu wechseln. Ein zusätzliches Wischen beim 4. Takbir beendet das Gebet automatisch.",
      Русский: "Смахните по карточке для перехода между такбирами. Дополнительное смахивание на 4-м такбире завершает молитву.",
      Español: "Desliza el dedo sobre la tarjeta para avanzar o retroceder. Un deslizamiento adicional en el 4º takbir finaliza la oración.",
      हिन्दी: "तकबीरों के बीच जाने के लिए कार्ड पर स्वाइप करें। चौथी तकबीर के बाद एक अतिरिक्त स्वाइप नमाज़ को स्वतः समाप्त कर देगा।",
      Indonesia: "Usap jari di atas kartu untuk berpindah takbir. Usapan ekstra pada takbir ke-4 akan mengakhiri shalat secara otomatis."
    }
  },
  shake: {
    icon: "📳",
    title: {
      English: "Shake Motion",
      العربية: "التقليب باهتزاز الجهاز",
      اردو: "فون ہلانے پر",
      Français: "Secousse de l'appareil",
      Deutsch: "Geräteschütteln",
      Русский: "Встряхивание устройства",
      Español: "Agitar el dispositivo",
      हिन्दी: "डिवाइस हिलाकर",
      Indonesia: "Guncang Perangkat"
    },
    desc: {
      English: "Gently shake your phone to advance to the next Takbeer. The sensor is paused for 5 seconds when starting prayer to let you settle, ignores shakes during screen touches, and operates within safe sensitivity (7 - 25).",
      العربية: "قم بهز الهاتف هزة خفيفة ومعتدلة بيدك للانتقال تلقائياً للتكبيرة التالية. يتم إيقاف المستشعر تماماً لمدة 5 ثوانٍ عند بدء الصلاة حتى يستقر الهاتف بيدك، كما يتم تجاهل الاهتزاز أثناء لمس الشاشة بالأصابع، مع حساسية مضبوطة تبدأ من 7 كحد فائق الحساسية إلى 25.",
      اردو: "فون کو ہلکا سا ہلا کر اگلی تکبیر پر جائیں۔ نماز شروع ہوتے ہی سینسر 5 سیکنڈ کے لیے توقف کرتا ہے اور اسکرین چھوتے وقت حرکت کو نظر انداز کرتا ہے۔",
      Français: "Secouez doucement votre téléphone. Le capteur est mis en pause pendant 5 secondes au début, ignore les mouvements pendant les touches tactiles et propose une sensibilité de 7 à 25.",
      Deutsch: "Schütteln Sie das Telefon sanft. Der Sensor pausiert beim Gebetsstart für 5 Sekunden, ignoriert Erschütterungen bei Bildschirmberührung und bietet Empfindlichkeit von 7 bis 25.",
      Русский: "Слегка встряхните телефон. Датчик блокируется на первые 5 секунд молитвы, игнорирует потряхивания во время касания экрана и настраивается от 7 до 25.",
      Español: "Agita suavemente el teléfono. El sensor se pausa 5 segundos al iniciar la oración, ignora movimientos al tocar la pantalla y ofrece sensibilidad de 7 a 25.",
      हिन्दी: "फ़ोन को हल्के से हिलाएं। नमाज़ शुरू होने पर सेंसर 5 सेकंड रुकता है और स्क्रीन छूते समय झटकों को नज़रअंदाज़ करता है।",
      Indonesia: "Guncang ponsel dengan lembut. Sensor dijeda 5 detik saat awal shalat, mengabaikan goyangan saat layar disentuh, dengan sensitivitas 7 - 25."
    }
  },
  voice: {
    icon: "🎙️",
    title: {
      English: "Voice Recognition",
      العربية: "التقليب بالصوت",
      اردو: "آوازی نیویگیشن",
      Français: "Reconnaissance vocale",
      Deutsch: "Spracherkennung",
      Русский: "Голосовое управление",
      Español: "Reconocimiento de voz",
      हिन्दी: "आवाज़ द्वारा",
      Indonesia: "Perintah Suara"
    },
    desc: {
      English: "Saying 'Allahu Akbar' advances to the next Takbeer with a 1.5-second safety debounce to prevent skipping. The microphone session runs continuously in the background and restarts automatically if ended. Saying 'As-Salamu Alaykum' at the 4th Takbeer ends the prayer.",
      العربية: "بمجرد التلفظ بـ 'الله أكبر' ينتقل التطبيق للتكبيرة التالية مع فاصل أمان زمني مدته 1.5 ثانية لمنع القفز السريع، مع استمرارية جلسة الميكروفون وإعادة تشغيلها تلقائياً عند أي انقطاع. وعند التكبيرة الرابعة، فإن قول 'السلام عليكم' ينهي الصلاة مباشرة.",
      اردو: "'اللہ اکبر' کہنے پر اگلی تکبیر آتی ہے، جس میں 1.5 سیکنڈ کا وقفہ رکھا گیا ہے۔ چوتھی تکبیر پر 'السلام علیکم' کہنے سے نماز ختم ہو جاتی ہے۔",
      Français: "Prononcer 'Allahu Akbar' avance au takbir suivant avec un délai de sécurité de 1,5s. Le micro redémarre automatiquement s'il se coupe, et dire 'As-Salamu Alaykum' au 4ème takbir clôture la prière.",
      Deutsch: "Das Sprechen von 'Allahu Akbar' schaltet mit 1,5s Schutzpause weiter. Das Mikrofon startet bei Unterbrechung automatisch neu, und 'As-Salamu Alaykum' beendet das Gebet.",
      Русский: "Произнесение 'Аллаху Акбар' переключает такбир с паузой безопасности 1.5 сек. Микрофон автоматически перезапускается в фоне, а слова 'Ас-Саляму Алейкум' завершают молитву.",
      Español: "Decir 'Allahu Akbar' avanza con un margen de 1.5s para evitar saltos. El micrófono se reinicia automáticamente si se corta, y decir 'As-Salamu Alaykum' en el 4º takbir finaliza la oración.",
      हिन्दी: "'अल्लाहु अकबर' कहने पर 1.5 सेकंड के सुरक्षित अंतराल के साथ अगली तकबीर आती है। चौथे तकबीर पर 'अस्सलामू अलैकुम' कहने से नमाज़ पूरी होती है।",
      Indonesia: "Mengucapkan 'Allahu Akbar' memajukan takbir dengan jeda aman 1,5 detik. Mikrofon menyala stabil dan otomatis mulai ulang; mengucap 'As-Salamu Alaykum' pada takbir ke-4 mengakhiri shalat."
    }
  },
  buttons: {
    icon: "🎛️",
    title: {
      English: "On-Screen Buttons",
      العربية: "التقليب بأزرار الشاشة",
      اردو: "اسکرین بٹن",
      Français: "Boutons à l'écran",
      Deutsch: "Bildschirmtasten",
      Русский: "Кнопки на экране",
      Español: "Botones en pantalla",
      हिन्दी: "स्क्रीन बटन",
      Indonesia: "Tombol Layar"
    },
    desc: {
      English: "Displays custom on-screen navigation buttons. You can customize them live inside the actual prayer session: switch between single or dual buttons, drag each button independently or locked together across the screen, and set individual positions per Takbeer.",
      العربية: "يُظهر أزرار تنقل أنيقة فوق الشاشة. يمكنك تخصيصها عبر شريط الأدوات الحي المباشر داخل الصلاة: اختيار نمط الزر الواحد أو الزرين، سحب كل زر بمفرده أو قفلهما معاً بحرية في الشاشة، وحفظ موضع وحجم وشفافية مخصصة لكل تكبيرة على حدة.",
      اردو: "اسکرین پر بٹن دکھاتا ہے۔ آپ نماز کے دوران لائیو ٹول بار سے بٹنوں کا سائز، شفافیت، ایک یا دو بٹن، اور ہر تکبیر کے لیے الگ الگ جگہ ترتیب دے سکتے ہیں۔",
      Français: "Affiche des boutons de navigation personnalisables en direct pendant la prière: un ou deux boutons, déplacement indépendant ou verrouillé, et position par takbir.",
      Deutsch: "Zeigt Bildschirmschaltflächen an, die direkt während des Gebets angepasst werden können: Einzel- oder Doppeltaste, getrenntes Ziehen und individuelle Position pro Takbir.",
      Русский: "Отображает экранные кнопки с живой настройкой прямо в молитве: один или два контроллера, раздельное перетаскивание и сохранение позиций для каждого такбира.",
      Español: "Muestra botones en pantalla personalizables en vivo durante la oración: modo simple o doble, arrastre independiente o bloqueado y posición personalizada por takbir.",
      हिन्दी: "स्क्रीन बटन प्रदर्शित करता है। आप नमाज़ के दौरान ही लाइव टूलबार से एक या दो बटन, उनका स्थान और आकार हर तकबीर के लिए अलग सेट कर सकते हैं।",
      Indonesia: "Menampilkan tombol di layar yang dapat disesuaikan langsung selama shalat: mode satu atau dua tombol, seret terpisah atau terkunci, dan posisi per takbir."
    }
  }
};