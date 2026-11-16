/* ==========================================================================
   بيانات الأذكار والأدعية وسنن الجنائز (Duas & Adhkar Data Architecture)
   أدعية مأثورة صحيحة من صحيح مسلم والسنن الصحاح مع ترجماتها الكاملة
   ========================================================================== */

const duasData = [
  {
    id: "deceased_duas",
    title: { 
      English: "Duas for the Deceased", 
      العربية: "أدعية المتوفى المأثورة", 
      اردو: "میت کے لیے ماثور دعائیں", 
      Français: "Invocations pour le défunt", 
      Deutsch: "Bittgebete für den Verstorbenen", 
      Русский: "Мольбы за умершего", 
      Español: "Súplicas por el difunto", 
      हिन्दी: "मृतक के लिए दुआएं", 
      Indonesia: "Doa-doa untuk Jenazah" 
    },
    desc: { 
      English: "Authentic supplications upon death, burial, and condolence", 
      العربية: "أدعية مأثورة صحيحة عند الموت والدفن والتعزية", 
      اردو: "موت، تدفین اور تعزیت کے وقت کی دعائیں", 
      Français: "Invocations authentiques lors du décès et de l'enterrement", 
      Deutsch: "Authentische Bittgebete bei Tod und Beerdigung", 
      Русский: "Достоверные мольбы при смерти и погребении", 
      Español: "Súplicas auténticas ante la muerte y el entierro", 
      हिन्दी: "मृत्यु और दफ़न के समय की प्रामाणिक दुआएं", 
      Indonesia: "Doa-doa shahih saat kematian dan pemakaman" 
    },
    icon: "🤲",
    items: [
      {
        title: { 
          English: "Comprehensive Dua for the Deceased (Sahih Muslim)", 
          العربية: "دعاء جامع للميت (صحيح مسلم)", 
          اردو: "میت کے لیے جامع دعا (صحیح مسلم)", 
          Français: "Invocation complète pour le défunt (Sahih Muslim)", 
          Deutsch: "Umfassendes Bittgebet für den Verstorbenen (Sahih Muslim)", 
          Русский: "Всеобъемлющая мольба за умершего (Сахих Муслим)", 
          Español: "Súplica completa por el difunto (Sahih Muslim)", 
          हिन्दी: "मृतक के लिए व्यापक दुआ (सहीह मुस्लिम)", 
          Indonesia: "Doa Lengkap untuk Jenazah (Shahih Muslim)" 
        },
        arabic: "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ، وَعَافِهِ وَاعْفُ عَنْهُ، وَأَكْرِمْ نُزُلَهُ، وَوَسِّعْ مُدْخَلَهُ، وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ، وَنَقِّهِ مِنَ الْخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الأَبْيَضَ مِنَ الدَّنَسِ، وَأَبْدِلْهُ دَارًا خَيْرًا مِنْ دَارِهِ، وَأَهْلاً خَيْرًا مِنْ أَهْلِهِ، وَزَوْجًا خَيْرًا مِنْ زَوْجِهِ، وَأَدْخِلْهُ الْجَنَّةَ، وَأَعِذْهُ مِنْ عَذَابِ الْقَبْرِ، وَمِنْ عَذَابِ النَّارِ",
        meaning: { 
          English: "O Allah, forgive him and have mercy on him, grant him well-being and pardon him. Honor his lodging and widen his entrance; wash him with water, snow, and hail, and purify him from sins as a white garment is cleansed from dirt. Replace his home with a better home, his family with a better family, and his spouse with a better spouse. Admit him to Paradise, and protect him from the torment of the grave and the torture of the Fire. (Sahih Muslim)", 
          العربية: "رواه مسلم عن عوف بن مالك رضي الله عنه. دعاء عظيم جامع لخيرات الآخرة، حتى قال عوف: فتمنيت أن أكون أنا ذلك الميت من حسن دعاء النبي ﷺ.", 
          Français: "Ô Allah, pardonne-lui et fais-lui miséricorde, accorde-lui le salut et pardonne-lui... (Rapporté par Muslim).", 
          اردو: "اے اللہ! اسے بخش دے، اس پر رحم فرما، اسے عافیت دے اور معاف فرما... (صحیح مسلم)", 
          Deutsch: "O Allah, vergib ihm und erbarme dich seiner... (Sahih Muslim).", 
          Русский: "О Аллах, прости его и помилуй его, избавь его и окажи ему милость... (Сахих Муслим).", 
          Español: "Oh Allah, perdónalo y ten misericordia de él... (Sahih Muslim).", 
          हिन्दी: "ऐ अल्लाह, इसे क्षमा कर और इस पर दया कर... (सहीह मुस्लिम)", 
          Indonesia: "Ya Allah, ampunilah dia dan rahmatilah dia... (HR. Muslim)." 
        }
      },
      {
        title: { 
          English: "Upon Closing the Eyes of the Deceased", 
          العربية: "الدعاء عند إغماض عين الميت", 
          اردو: "میت کی آنکھیں بند کرتے وقت کی دعا", 
          Français: "En fermant les yeux du défunt", 
          Deutsch: "Beim Schließen der Augen des Verstorbenen", 
          Русский: "При закрывании глаз умершего", 
          Español: "Al cerrar los ojos del difunto", 
          हिन्दी: "मृतक की आँखें बंद करते समय", 
          Indonesia: "Saat memejamkan mata mayit" 
        },
        arabic: "اللَّهُمَّ اغْفِرْ لِفُلاَنٍ (باسمه)، وَارْفَعْ دَرَجَتَهُ فِي الْمَهْدِيِّينَ، وَاخْلُفْهُ فِي عَقِبِهِ فِي الْغَابِرِينَ، وَاغْفِرْ لَنَا وَلَهُ يَا رَبَّ الْعَالَمِينَ، وَافْسَحْ لَهُ فِي قَبْرِهِ وَنَوِّرْ لَهُ فِيهِ",
        meaning: { 
          English: "O Allah, forgive [Name], raise his status among the rightly guided, grant a successor to his lineage among those who remain, forgive us and him O Lord of the Worlds, make his grave spacious, and illuminate it for him. (Sahih Muslim)", 
          العربية: "رواه مسلم عن أم سلمة رضي الله عنها حين مات أبو سلمة. ويُستحب ذكر اسم المتوفى فيه.", 
          Français: "Ô Allah, pardonne à [Nom], élève son rang parmi les bien-guidés... (Rapporté par Muslim).", 
          اردو: "اے اللہ! فلاں کو بخش دے اور ہدایت پانے والوں میں اس کا درجہ بلند فرما... (صحیح مسلم)", 
          Deutsch: "O Allah, vergib [Name] und erhöhe seinen Rang unter den Rechtgeleiteten... (Sahih Muslim).", 
          Русский: "О Аллах, прости [Имя] и возвысь степень его среди ведомых правильным путём... (Сахих Муслим).", 
          Español: "Oh Allah, perdona a [Nombre] y eleva su grado entre los bien guiados... (Sahih Muslim).", 
          हिन्दी: "ऐ अल्लाह, [नाम] को क्षमा कर और हिदायत पाए हुओं में इसका दर्जा बुलंद कर... (सहीह मुस्लिम)", 
          Indonesia: "Ya Allah, ampunilah si [Nama], tinggikanlah derajatnya di kalangan orang-orang yang mendapat petunjuk... (HR. Muslim)." 
        }
      },
      {
        title: { 
          English: "When Placing the Body in the Grave", 
          العربية: "الدعاء عند وضع الميت في القبر", 
          اردو: "میت کو قبر میں رکھتے وقت کی دعا", 
          Français: "En déposant le défunt dans la tombe", 
          Deutsch: "Beim Hinablassen in das Grab", 
          Русский: "При помещении умершего в могилу", 
          Español: "Al colocar el cuerpo en la tumba", 
          हिन्दी: "शव को क़ब्र में रखते समय", 
          Indonesia: "Saat meletakkan mayit ke liang lahad" 
        },
        arabic: "بِسْمِ اللَّهِ، وَعَلَى مِلَّةِ رَسُولِ اللَّهِ (أَوْ: وَعَلَى سُنَّةِ رَسُولِ اللَّهِ)",
        meaning: { 
          English: "In the name of Allah, and upon the creed (or tradition) of the Messenger of Allah. (Sunan Abi Dawud & At-Tirmidhi, Sahih)", 
          العربية: "حديث صحيح رواه أبو داود والترمذي وابن ماجه. يُقال عند إدخال الميت من مؤخرة القبر وتوجيهه للقبلة.", 
          Français: "Au nom d'Allah, et selon la tradition du Messager d'Allah.", 
          اردو: "اللہ کے نام سے، اور رسول اللہ ﷺ کے طریقے (ملت) پر۔", 
          Deutsch: "Im Namen Allahs und gemäß der Sunnah des Gesandten Allahs.", 
          Русский: "С именем Аллаха и в соответствии с сунной Посланника Аллаха.", 
          Español: "En el nombre de Allah y según la tradición del Mensajero de Allah.", 
          हिन्दी: "अल्लाह के नाम से और अल्लाह के रसूल के तरीके पर।", 
          Indonesia: "Dengan nama Allah dan di atas jalan (sunnah) Rasulullah." 
        }
      },
      {
        title: { 
          English: "After the Burial (Asking for Steadfastness)", 
          العربية: "الدعاء بعد الفراغ من دفن الميت", 
          اردو: "تدفین کے بعد ثبات کی دعا", 
          Français: "Après l'enterrement (Demande de fermeté)", 
          Deutsch: "Nach der Beisetzung (Für Standhaftigkeit)", 
          Русский: "После погребения (Мольба о стойкости)", 
          Español: "Tras el entierro (Pedir firmeza)", 
          हिन्दी: "दफ़न के बाद साबित क़दमी की دعا", 
          Indonesia: "Setelah pemakaman (Memohon keteguhan)" 
        },
        arabic: "اللَّهُمَّ اغْفِرْ لَهُ، اللَّهُمَّ ثَبِّتْهُ، فَإِنَّهُ الآنَ يُسْأَلُ",
        meaning: { 
          English: "O Allah, forgive him. O Allah, strengthen him, for he is being questioned right now. (Sunan Abi Dawud, Sahih)", 
          العربية: "رواه أبو داود وصححه الحاكم والألباني. كان النبي ﷺ إذا فرغ من دفن الميت وقف عليه واستغفر له وسأل له التثبيت.", 
          Français: "Ô Allah, pardonne-lui. Ô Allah, affermis-le, car il est interrogé en cet instant.", 
          اردو: "اے اللہ! اسے بخش دے، اے اللہ! اسے ثابت قدم رکھ، کیونکہ اس وقت اس سے سوال ہو رہا ہے۔", 
          Deutsch: "O Allah, vergib ihm. O Allah, festige ihn, denn er wird jetzt befragt.", 
          Русский: "О Аллах, прости его! О Аллах, укрепи его, ведь сейчас его опрашивают!", 
          Español: "Oh Allah, perdónalo. Oh Allah, confírmalo, pues ahora está siendo interrogado.", 
          हिन्दी: "ऐ अल्लाह, इसे क्षमा कर। ऐ अल्लाह, इसे साबित क़दम रख, क्योंकि अब इससे सवाल हो रहा है।", 
          Indonesia: "Ya Allah, ampunilah dia. Ya Allah, teguhkanlah dia, karena sungguh ia sekarang sedang ditanya." 
        }
      },
      {
        title: { 
          English: "Condolence Supplication (Ta'ziyah)", 
          العربية: "دعاء التعزية لأهل الميت", 
          اردو: "تعزیت کے کلمات", 
          Français: "Formule de condoléances", 
          Deutsch: "Beileidsbekundung (Ta'ziyah)", 
          Русский: "Слова соболезнования (Та'зия)", 
          Español: "Súplica de condolencias (Ta'ziyah)", 
          हिन्दी: "शोक सांत्वना की दुआ", 
          Indonesia: "Ucapan Takziyah" 
        },
        arabic: "إِنَّ لِلَّهِ مَا أَخَذَ، وَلَهُ مَا أَعْطَى، وَكُلٌّ عِنْدَهُ بِأَجَلٍ مُسَمًّى، فَلْتَصْبِرْ وَلْتَحْتَسِبْ",
        meaning: { 
          English: "Verily to Allah belongs what He took, and to Him belongs what He gave, and everything has an appointed time with Him; so be patient and anticipate Allah's reward. (Sahih Al-Bukhari & Muslim)", 
          العربية: "متفق عليه، وهو أصح وأعظم ما يُعزى به أهل الميت، ويُرد عليه: آجركم الله، أو غفر الله لميتكم.", 
          Français: "Certes à Allah appartient ce qu'Il a repris et ce qu'Il a donné, et toute chose a un terme fixé auprès de Lui. Patiente et espère la récompense.", 
          اردو: "بے شک اللہ ہی کا ہے جو اس نے لے لیا اور اسی کا ہے جو اس نے دیا، اور ہر چیز کا اس کے پاس ایک مقررہ وقت ہے۔ پس صبر کرو اور ثواب کی امید رکھو۔", 
          Deutsch: "Gewiss gehört Allah, was Er genommen hat, und Ihm gehört, was Er gegeben hat. Sei geduldig und hoffe auf Seinen Lohn.", 
          Русский: "Поистине, Аллаху принадлежит то, что Он забрал, и то, что Он даровал, и для всего установил Он срок. Проявляй же терпение и уповай на награду.", 
          Español: "Ciertamente, pertenece a Allah lo que tomó y le pertenece lo que dio, y todo tiene un plazo prefijado. Ten paciencia y busca la recompensa.", 
          हिन्दी: "बेशक अल्लाह ही का है जो उसने लिया और उसी का है जो उसने दिया, और हर चीज़ का उसके पास एक तय समय है। सब्र करो और सवाब की उम्मीद रखो।", 
          Indonesia: "Sesungguhnya milik Allah apa yang Dia ambil dan milik-Nya apa yang Dia beri, dan segala sesuatu ada batas waktunya di sisi-Nya. Bersabarlah dan carilah pahala." 
        }
      }
    ]
  },
  {
    id: "funeral_sunnahs",
    title: { 
      English: "Sunnahs & Etiquettes of Janazah", 
      العربية: "سنن وآداب الجنائز", 
      اردو: "جنائز کی سنتیں اور آداب", 
      Français: "Sunnahs et convenances mortuaires", 
      Deutsch: "Sunnahs & Benimmregeln bei Beerdigungen", 
      Русский: "Сунны и адабы джаназа", 
      Español: "Sunnahs y modales funerarios", 
      हिन्दी: "जनाज़े की सुन्नतें और शिष्टाचार", 
      Indonesia: "Sunnah & Adab Jenazah" 
    },
    desc: { 
      English: "Prophetic virtues, speed of burial, and visiting cemeteries", 
      العربية: "توجيهات نبوية في فضل اتباع الجنائز والصبر والآداب الشرعية", 
      اردو: "جنازے کی پیروی اور صبر کے آداب", 
      Français: "Directives prophétiques et récompenses des funérailles", 
      Deutsch: "Prophetische Ratschläge und Verhaltensweisen", 
      Русский: "Пророческие наставления о посещении похорон", 
      Español: "Guía de conducta y méritos en el cortejo fúnebre", 
      हिन्दी: "जनाज़े में शामिल होने के आदाब और फ़ज़ीलत", 
      Indonesia: "Panduan dan adab mengiringi jenazah" 
    },
    icon: "📜",
    items: [
      {
        title: { 
          English: "Virtue of Attending the Funeral (The Two Qirats)", 
          العربية: "فضل اتباع الجنازة وثواب القيراطين", 
          اردو: "جنازے کے ساتھ چلنے اور دو قیراط کا ثواب", 
          Français: "Le mérite de suivre le cortège (Les deux Qirats)", 
          Deutsch: "Der Lohn der Beerdigungsbegleitung (Zwei Qirate)", 
          Русский: "Награда за участие в похоронах (Два кирата)", 
          Español: "Recompensa del cortejo fúnebre (Los dos Qirats)", 
          हिन्दी: "जनाज़े में शामिल होने और दो क़ीरात का सवाब", 
          Indonesia: "Keutamaan Mengiringi Jenazah (Dua Qirath)" 
        },
        arabic: "مَنْ شَهِدَ الجَنَازَةَ حَتَّى يُصَلَّى عَلَيْهَا فَلَهُ قِيرَاطٌ، وَمَنْ شَهِدَهَا حَتَّى تُدْفَنَ فَلَهُ قِيرَاطَانِ. قِيلَ: وَمَا القِيرَاطَانِ؟ قَالَ: «مِثْلُ الجَبَلَيْنِ العَظِيمَيْنِ»",
        meaning: { 
          English: "Whoever attends the funeral until prayer is offered gets one Qirat, and whoever attends until burial gets two Qirats. It was asked: 'What are the two Qirats?' He said: 'Like two immense mountains.' (Sahih Al-Bukhari & Muslim)", 
          العربية: "متفق عليه، وهو حث نبوي عظيم على كسب الأجر العظيم بمواساة أهل الميت والدعاء له والصلاة عليه وحضور دفنه.", 
          Français: "Quiconque assiste aux funérailles jusqu'à la prière obtient un Qirat, et jusqu'à l'inhumation deux Qirats... (Al-Bukhari & Muslim).", 
          اردو: "جس نے نمازِ جنازہ پڑھی اس کے لیے ایک قیراط ہے، اور جو تدفین تک ساتھ رہا اس کے لیے دو قیراط ہیں... (متفق علیہ)", 
          Deutsch: "Wer dem Totengebet beiwohnt, erhält einen Qirat, und wer bis zur Beerdigung bleibt, zwei Qirate... (Al-Bukhari & Muslim).", 
          Русский: "Кто присутствовал на похоронах до совершения молитвы, получит награду в один кират, а кто остался до погребения — в два кирата... (Аль-Бухари и Муслим).", 
          Español: "Quien asista al funeral hasta la oración obtendrá un Qirat, y quien asista hasta el entierro obtendrá dos Qirats... (Al-Bujari y Muslim).", 
          हिन्दी: "जिसने जनाज़े की नमाज़ पढ़ी उसके लिए एक क़ीरात है, और जो दफ़न तक रहा उसके लिए दो क़ीरात हैं... (बुख़ारी व मुस्लिम)", 
          Indonesia: "Barangsiapa menghadiri jenazah hingga dishalatkan maka baginya satu qirath, dan yang hadir hingga dimakamkan maka dua qirath... (HR. Bukhari & Muslim)." 
        }
      },
      {
        title: { 
          English: "Speeding up the Funeral Procession", 
          العربية: "استحباب الإسراع بالجنازة", 
          اردو: "جنازے کو جلدی لے جانا", 
          Français: "La hâte recommandée dans le cortège funèbre", 
          Deutsch: "Die Beisetzung zügig vorantreiben", 
          Русский: "Поспешность в погребении", 
          Español: "Acelerar el paso en el cortejo", 
          हिन्दी: "जनाज़ा जल्दी ले जाने की ताकीद", 
          Indonesia: "Menyegerakan Pengurusan Jenazah" 
        },
        arabic: "أَسْرِعُوا بِالْجَنَازَةِ؛ فَإِنْ تَكُ صَالِحَةً فَخَيْرٌ تُقَدِّمُونَهَا إِلَيْهِ، وَإِنْ تَكُ سِوَى ذَلِكَ فَشَرٌّ تَضَعُونَهُ عَنْ رِقَابِكُمْ",
        meaning: { 
          English: "Hasten with the funeral; for if it was righteous, you are advancing it to good; and if otherwise, it is an evil you are removing from your necks. (Sahih Al-Bukhari & Muslim)", 
          العربية: "متفق عليه. أدب نبوي رفيع في الإسراع بتجهيز الميت وتوديعه، من غير ركض يُسقط الجنازة أو يخل بالسكينة.", 
          Français: "Hâtez-vous pour le convoi funèbre... (Al-Bukhari & Muslim).", 
          اردو: "جنازے کو لے جانے میں جلدی کرو... (متفق علیہ)", 
          Deutsch: "Beeilt euch mit der Totenbahre... (Al-Bukhari & Muslim).", 
          Русский: "Ускоряйте движение похоронных носилок... (Аль-Бухари и Муслим).", 
          Español: "Apresuraos con el cortejo fúnebre... (Al-Bujari y Muslim).", 
          हिन्दी: "जनाज़े को ले जाने में जल्दी करो... (बुख़ारी व मुस्लिम)", 
          Indonesia: "Bersegeralah dalam mengurus jenazah... (HR. Bukhari & Muslim)." 
        }
      },
      {
        title: { 
          English: "Greeting at the Cemetery (Visiting Graves)", 
          العربية: "السلام عند زيارة القبور", 
          اردو: "قبرستان میں داخلے کا سلام", 
          Français: "Salutation lors de la visite du cimetière", 
          Deutsch: "Gruß beim Friedhofsbesuch", 
          Русский: "Приветствие при посещении могил", 
          Español: "Saludo al visitar el cementerio", 
          हिन्दी: "क़ब्रिस्तान में दाख़िल होने का सलाम", 
          Indonesia: "Doa Masuk / Menziarahi Makam" 
        },
        arabic: "السَّلَامُ عَلَيْكُمْ دَارَ قَوْمٍ مُؤْمِنِينَ، وَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لَاحِقُونَ، نَسْأَلُ اللَّهَ لَنَا وَلَكُمُ الْعَافِيَةَ",
        meaning: { 
          English: "Peace be upon you, O inhabitants of this abode of believers. Indeed, we shall, if Allah wills, join you. We ask Allah for well-being for us and for you. (Sahih Muslim)", 
          العربية: "رواه مسلم. كان النبي ﷺ يُعلّم أصحابه إذا خرجوا إلى المقابر أن يقولوا ذلك دعاءً وتذكيراً بالآخرة.", 
          Français: "Que la paix soit sur vous, ô résidents de cette demeure croyante... (Rapporté par Muslim).", 
          اردو: "سلامتی ہو تم پر اے مومنوں کے گھر والو! اور ہم بھی اللہ نے چاہا تو تم سے ملنے والے ہیں... (صحیح مسلم)", 
          Deutsch: "Friede sei auf euch, O Bewohner dieser Stätte von Gläubigen... (Sahih Muslim).", 
          Русский: "Мир вам, о обитатели жилищ верующих! Поистине, мы, если пожелает Аллах, присоединимся к вам... (Сахих Муслим).", 
          Español: "La paz sea con vosotros, ¡oh habitantes de la morada de los creyentes!... (Sahih Muslim).", 
          हिन्दी: "सलामती हो तुम पर ऐ मोमिनों के घर वालो! हम भी इनशा अल्लाह तुमसे मिलने वाले हैं... (सहीह मुस्लिम)", 
          Indonesia: "Semoga keselamatan tercurah kepada kalian wahai penghuni kaum mukminin... (HR. Muslim)." 
        }
      }
    ]
  },
  {
    id: "general_remembrance",
    title: { 
      English: "General Remembrances (Adhkar)", 
      العربية: "أذكار عامة ومأثورة", 
      اردو: "عام اذکار اور دعائیں", 
      Français: "Invocations et rappels généraux", 
      Deutsch: "Allgemeine Bittgebete & Gedenken", 
      Русский: "Общие поминания и мольбы", 
      Español: "Súplicas y recuerdos generales", 
      हिन्दी: "सामान्य अज़कार और दुआएं", 
      Indonesia: "Dzikir & Doa Umum" 
    },
    desc: { 
      English: "Words of patience during calamity and seeking forgiveness", 
      العربية: "أذكار الاسترجاع والصبر والاستغفار المأمور بها في الشدائد", 
      اردو: "استرجاع، صبر اور استغفار کے اذکار", 
      Français: "Invocations de patience et de repentir", 
      Deutsch: "Worte der Geduld und des Bittens um Vergebung", 
      Русский: "Слова терпения, покаяния и мольбы", 
      Español: "Palabras de paciencia y perdón", 
      हिन्दी: "सब्र और इस्तिग़फ़ار के أज़कार", 
      Indonesia: "Dzikir istirja' dan memohon ampunan" 
    },
    icon: "✨",
    items: [
      {
        title: { 
          English: "Supplication in Calamity (Istirja')", 
          العربية: "دعاء المصيبة والاسترجاع (صحيح مسلم)", 
          اردو: "مصیبت کے وقت کی دعا (صحیح مسلم)", 
          Français: "Invocation face à l'affliction (Sahih Muslim)", 
          Deutsch: "Bittgebet bei Unglück (Sahih Muslim)", 
          Русский: "Мольба при несчастье (Сахих Муслим)", 
          Español: "Súplica ante la calamidad (Sahih Muslim)", 
          हिन्दी: "मुसीबत के समय की दुआ (सहीह मुस्लिम)", 
          Indonesia: "Doa Tertimpa Musibah (Shahih Muslim)" 
        },
        arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي، وَأَخْلِفْ لِي خَيْرًا مِنْهَا",
        meaning: { 
          English: "Truly, to Allah we belong and truly, to Him we shall return. O Allah, reward me in my affliction and replace it with something better. (Sahih Muslim)", 
          العربية: "رواه مسلم عن أم سلمة. قال النبي ﷺ: ما من مسلم تصيبه مصيبة فيقول ما أمره الله به إلا آجره الله في مصيبته وأخلف له خيراً منها.", 
          Français: "Certes nous appartenons à Allah et à Lui nous retournerons. Ô Allah, récompense-moi dans mon épreuve et remplace-la par quelque chose de meilleur.", 
          اردو: "ہم اللہ ہی کے ہیں اور اسی کی طرف لوٹنے والے ہیں۔ اے اللہ! مجھے میری مصیبت میں اجر دے اور اس کا بہتر بدل عطا فرما۔", 
          Deutsch: "Wir gehören Allah und zu Ihm kehren wir zurück. O Allah, belohne mich in meiner Not und gib mir etwas Besseres dafür.", 
          Русский: "Поистине, мы принадлежим Аллаху и к Нему возвращаемся! О Аллах, вознагради меня в моём несчастье и замени его лучшим!", 
          Español: "A Allah pertenecemos y a Él hemos de volver. ¡Oh Allah! Recompénsame en mi aflicción y dame a cambio algo mejor.", 
          हिन्दी: "हम अल्लाह ही के हैं और उसी की तरफ़ लौटने वाले हैं। ऐ अल्लाह, मुझे मेरी मुसीबत में सवाब दे और इसका बेहतर बदला दे।", 
          Indonesia: "Sesungguhnya kami milik Allah dan kepada-Nya kami kembali. Ya Allah, berilah pahala atas musibahku ini dan gantikanlah dengan yang lebih baik." 
        }
      },
      {
        title: { 
          English: "Master of Seeking Forgiveness (Sayyid al-Istighfar)", 
          العربية: "سيد الاستغفار (صحيح البخاري)", 
          اردو: "سید الاستغفار (صحیح بخاری)", 
          Français: "Le maître de la demande de pardon (Sahih Al-Bukhari)", 
          Deutsch: "Das vollkommenste Bittgebet um Vergebung (Sahih Al-Bukhari)", 
          Русский: "Господин покаяния (Сахих аль-Бухари)", 
          Español: "El señor del perdón (Sahih Al-Bujari)", 
          हिन्दी: "सैय्यदुल इस्तिग़फ़ार (सहीह बुख़ारी)", 
          Indonesia: "Sayyidul Istighfar (Shahih Al-Bukhari)" 
        },
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
        meaning: { 
          English: "O Allah, You are my Lord, none has the right to be worshipped but You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me, and I acknowledge my sin, so forgive me, for none forgives sins except You. (Sahih Al-Bukhari)", 
          العربية: "رواه البخاري في صحيحه. قال النبي ﷺ: من قالها موقناً بها حين يمسي فمات من ليلته دخل الجنة، ومن قالها موقناً بها حين يصبح فمات من يومه دخل الجنة.", 
          Français: "Ô Allah, Tu es mon Seigneur, il n'y a de divinité que Toi... (Rapporté par Al-Bukhari).", 
          اردو: "اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے ہی مجھے پیدا کیا اور میں تیرا بندہ ہوں... (صحیح بخاری)", 
          Deutsch: "O Allah, Du bist mein Herr, es gibt keinen Gott außer Dir... (Sahih Al-Bukhari).", 
          Русский: "О Аллах, Ты — мой Господь, и нет божества, кроме Тебя... (Сахих аль-Бухари).", 
          Español: "¡Oh Allah! Tú eres mi Señor, no hay más divinidad que Tú... (Sahih Al-Bujari).", 
          हिन्दी: "ऐ अल्लाह, तू मेरा रब है, तेरे सिवा कोई इबादत के लायक़ नहीं, तूने मुझे पैदा किया और मैं तेरा बंदा हूँ... (सहीह बुख़ारी)", 
          Indonesia: "Ya Allah, Engkau adalah Rabbku, tidak ada sesembahan yang berhak disembah selain Engkau... (HR. Bukhari)." 
        }
      }
    ]
  }
];