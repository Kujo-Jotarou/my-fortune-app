import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, query, orderBy, onSnapshot, addDoc, deleteDoc } from 'firebase/firestore';

// Tailwind CSS is assumed to be available

function App() {
    // Firebase initialization and authentication states
    const [app, setApp] = useState(null);
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loadingFirebase, setLoadingFirebase] = useState(true);

    // User input states
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState(''); //YYYY-MM-DD
    const [birthTime, setBirthTime] = useState(''); // HH:MM
    const [birthPlace, setBirthPlace] = useState('');
    const [bloodType, setBloodType] = useState('A');
    const [mbtiType, setMbtiType] = useState('ISTJ'); // Default MBTI type
    const [selectedFortuneCategory, setSelectedFortuneCategory] = useState('');
    const [showSaveSuccess, setShowSaveSuccess] = useState(false);

    // Fortune result states
    const [fortuneResult, setFortuneResult] = useState('');
    const [isLoadingFortune, setIsLoadingFortune] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [fortuneHistory, setFortuneHistory] = useState([]);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    // Tarot states
    const [drawnTarotCards, setDrawnTarotCards] = useState([]); // [{name: 'Fool', position: 'Past', isReversed: false}]
    const [isDrawingTarot, setIsDrawingTarot] = useState(false);

    // Ad states
    const [showAdModal, setShowAdModal] = useState(false);
    const [adTimer, setAdTimer] = useState(0);
    const AD_DURATION = 20; // seconds
    const [hasSharedForAdSkip, setHasSharedForAdSkip] = useState(false); // New state for ad skip

    // Refs for scrolling
    const inputSectionRef = useRef(null);
    const resultSectionRef = useRef(null);
    const historySectionRef = useRef(null);

    const fortuneCategories = [
        { value: '', label: '占いたいジャンルを選択してください' },
        { value: '今日の運勢', label: '今日の運勢' },
        { value: '恋愛運', label: '恋愛運' },
        { value: '仕事運', label: '仕事運' },
        { value: '金運', label: '金運' },
        { value: '健康運', label: '健康運' },
        { value: '対人関係運', label: '対人関係運' },
        { value: '自己成長', label: '自己成長' },
    ];

    const mbtiOptions = [
        'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
        'ISTP', 'ISFP', 'INFP', 'INTP',
        'ESTP', 'ESFP', 'ENFP', 'ENTP',
        'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
    ];

    const bloodTypeOptions = ['A', 'B', 'O', 'AB'];

    // --- Tarot Card Data (Full 78 cards - Rider-Waite-Smith names) ---
    const tarotDeck = [
        // Major Arcana (22 cards)
        { name: "0 愚者 (The Fool)" },
        { name: "I 魔術師 (The Magician)" },
        { name: "II 女教皇 (The High Priestess)" },
        { name: "III 女帝 (The Empress)" },
        { name: "IV 皇帝 (The Emperor)" },
        { name: "V 法王 (The Hierophant)" },
        { name: "VI 恋人 (The Lovers)" },
        { name: "VII 戦車 (The Chariot)" },
        { name: "VIII 力 (Strength)" }, // RWS order
        { name: "IX 隠者 (The Hermit)" },
        { name: "X 運命の輪 (Wheel of Fortune)" },
        { name: "XI 正義 (Justice)" }, // RWS order
        { name: "XII 吊るされた男 (The Hanged Man)" },
        { name: "XIII 死神 (Death)" },
        { name: "XIV 節制 (Temperance)" },
        { name: "XV 悪魔 (The Devil)" },
        { name: "XVI 塔 (The Tower)" },
        { name: "XVII 星 (The Star)" },
        { name: "XVIII 月 (The Moon)" },
        { name: "XIX 太陽 (The Sun)" },
        { name: "XX 審判 (Judgement)" },
        { name: "XXI 世界 (The World)" },

        // Minor Arcana - Wands (棒) (14 cards)
        { name: "ワンドのエース (Ace of Wands)" },
        { name: "ワンドの2 (Two of Wands)" },
        { name: "ワンドの3 (Three of Wands)" },
        { name: "ワンドの4 (Four of Wands)" },
        { name: "ワンドの5 (Five of Wands)" },
        { name: "ワンドの6 (Six of Wands)" },
        { name: "ワンドの7 (Seven of Wands)" },
        { name: "ワンドの8 (Eight of Wands)" },
        { name: "ワンドの9 (Nine of Wands)" },
        { name: "ワンドの10 (Ten of Wands)" },
        { name: "ワンドのペイジ (Page of Wands)" },
        { name: "ワンドのナイト (Knight of Wands)" },
        { name: "ワンドのクイーン (Queen of Wands)" },
        { name: "ワンドのキング (King of Wands)" },

        // Minor Arcana - Cups (聖杯) (14 cards)
        { name: "カップのエース (Ace of Cups)" },
        { name: "カップの2 (Two of Cups)" },
        { name: "カップの3 (Three of Cups)" },
        { name: "カップの4 (Four of Cups)" },
        { name: "カップの5 (Five of Cups)" },
        { name: "カップの6 (Six of Cups)" },
        { name: "カップの7 (Seven of Cups)" },
        { name: "カップの8 (Eight of Cups)" },
        { name: "カップの9 (Nine of Cups)" },
        { name: "カップの10 (Ten of Cups)" },
        { name: "カップのペイジ (Page of Cups)" },
        { name: "カップのナイト (Knight of Cups)" },
        { name: "カップのクイーン (Queen of Cups)" },
        { name: "カップのキング (King of Cups)" },

        // Minor Arcana - Swords (剣) (14 cards)
        { name: "ソードのエース (Ace of Swords)" },
        { name: "ソードの2 (Two of Swords)" },
        { name: "ソードの3 (Three of Swords)" },
        { name: "ソードの4 (Four of Swords)" },
        { name: "ソードの5 (Five of Swords)" },
        { name: "ソードの6 (Six of Swords)" },
        { name: "ソードの7 (Seven of Swords)" },
        { name: "ソードの8 (Eight of Swords)" },
        { name: "ソードの9 (Nine of Swords)" },
        { name: "ソードの10 (Ten of Swords)" },
        { name: "ソードのペイジ (Page of Swords)" },
        { name: "ソードのナイト (Knight of Swords)" },
        { name: "ソードのクイーン (Queen of Swords)" },
        { name: "ソードのキング (King of Swords)" },

        // Minor Arcana - Pentacles (金貨) (14 cards)
        { name: "ペンタクルのエース (Ace of Pentacles)" },
        { name: "ペンタクルの2 (Two of Pentacles)" },
        { name: "ペンタクルの3 (Three of Pentacles)" },
        { name: "ペンタクルの4 (Four of Pentacles)" },
        { name: "ペンタクルの5 (Five of Pentacles)" },
        { name: "ペンタクルの6 (Six of Pentacles)" },
        { name: "ペンタクルの7 (Seven of Pentacles)" },
        { name: "ペンタクルの8 (Eight of Pentacles)" },
        { name: "ペンタクルの9 (Nine of Pentacles)" },
        { name: "ペンタクルの10 (Ten of Pentacles)" },
        { name: "ペンタクルのペイジ (Page of Pentacles)" },
        { name: "ペンタクルのナイト (Knight of Pentacles)" },
        { name: "ペンタクルのクイーン (Queen of Pentacles)" },
        { name: "ペンタクルのキング (King of Pentacles)" },
    ];


    // --- Firebase Initialization and Authentication ---
    useEffect(() => {
        const initializeFirebase = async () => {
            setLoadingFirebase(true); // Ensure loading state starts true
            setErrorMessage(''); // Clear previous errors

            if (app) { // If app is already initialized, just set loading false
                setLoadingFirebase(false);
                return;
            }

            try {
                // ここにFirebase Consoleからコピーした実際の構成情報を直接貼り付けます
                // あなたが提供したfirebaseConfigオブジェクトをここに統合しました
                const firebaseConfig = {
                    apiKey: "AIzaSyCzuMnPW3PTMoVUBUB8057CqyHW421sDnw",
                    authDomain: "myfortuneapp-c7667.firebaseapp.com",
                    projectId: "myfortuneapp-c7667",
                    storageBucket: "myfortuneapp-c7667.firebasestorage.app",
                    messagingSenderId: "770046874662",
                    appId: "1:770046874662:web:115065e3877397d1b082e7",
                    measurementId: "G-NQ701V0GWS"
                };

                const initializedApp = initializeApp(firebaseConfig);
                const authInstance = getAuth(initializedApp);
                const dbInstance = getFirestore(initializedApp);

                setApp(initializedApp);
                setAuth(authInstance);
                setDb(dbInstance);

                let userSignedIn = false;

                // Canvas環境での認証トークンが存在すればそれを使用、エラー時には匿名でサインイン
                if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                    try {
                        await signInWithCustomToken(authInstance, __initial_auth_token);
                        console.log("Firebase: Signed in with custom token from Canvas.");
                        userSignedIn = true;
                    } catch (tokenError) {
                        // カスタムトークン認証が失敗した場合（例: トークンが無効、期限切れなど）、警告ログを出し匿名認証にフォールバック
                        console.warn("Firebase: Custom token sign-in failed (might be invalid or expired for this project config), attempting anonymous sign-in.", tokenError);
                        // このエラーは致命的ではないため、ここでsetErrorMessageは行わない
                    }
                }

                // もしまだサインインしていなければ、匿名認証を試みる
                if (!userSignedIn) {
                    try {
                        await signInAnonymously(authInstance);
                        console.log("Firebase: Signed in anonymously.");
                        userSignedIn = true; // 匿名認証が成功した場合、userSignedInをtrueにする
                    } catch (anonymousError) {
                        // 匿名認証自体が失敗した場合、これは致命的な認証エラー
                        console.error("Firebase: Anonymous sign-in failed. App features might be limited.", anonymousError);
                        setErrorMessage("Firebase認証に失敗しました。アプリの機能が制限されます。詳細: " + anonymousError.message);
                    }
                }

                // 認証状態の変更を監視 (初期サインイン試行後に設定)
                onAuthStateChanged(authInstance, (user) => {
                    if (user) {
                        setUserId(user.uid);
                        console.log('Firebase user ID:', user.uid);
                        // ユーザーが認証された後にデータ読み込み関数を呼び出す
                        loadUserData(dbInstance, user.uid);
                        loadFortuneHistory(dbInstance, user.uid);
                    } else {
                        setUserId(null);
                        // ユーザーがサインアウトした場合や認証されていない場合に状態をリセット
                        setName('');
                        setBirthDate('');
                        setBirthTime('');
                        setBirthPlace('');
                        setBloodType('A');
                        setMbtiType('ISTJ');
                        setFortuneHistory([]);
                        console.log('No user signed in after auth state change.');
                    }
                    setLoadingFirebase(false); // 認証フロー完了
                });

            } catch (initializationError) {
                // Firebase Appの初期化自体が失敗するような致命的なエラーを捕捉
                console.error("Firebaseアプリケーションの初期化に致命的なエラーが発生しました:", initializationError);
                setErrorMessage("Firebaseの初期化に失敗しました。アプリは動作しません。詳細: " + initializationError.message);
                setLoadingFirebase(false);
            }
        };

        initializeFirebase();
    }, [app]); // `app` を依存関係に含めることで、アプリが初期化済みなら再実行しないようにする

    // --- User Data Management (Firestore) ---
    const loadUserData = async (firestore, uid) => {
        if (!firestore || !uid) return;
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'; // Canvas環境変数を取得
        const userDocRef = doc(firestore, `artifacts/${appId}/users/${uid}/user_data/profile`);
        try {
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setName(data.name || '');
                setBirthDate(data.birthDate ? new Date(data.birthDate.toDate()).toISOString().split('T')[0] : '');
                setBirthTime(data.birthTime || '');
                setBirthPlace(data.birthPlace || '');
                setBloodType(data.bloodType || 'A');
                setMbtiType(data.mbtiType || 'ISTJ'); // Load MBTI type
                setHasSharedForAdSkip(data.hasSharedForAdSkip || false); // Load ad skip status
            }
        } catch (error) {
            console.error("ユーザーデータの読み込みに失敗しました:", error);
            setErrorMessage("ユーザーデータの読み込みに失敗しました。");
        }
    };

    const saveUserData = async () => {
        if (!db || !userId) {
            setErrorMessage("ユーザーが認証されていません。");
            return;
        }
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'; // Canvas環境変数を取得
        const userDocRef = doc(db, `artifacts/${appId}/users/${userId}/user_data/profile`);
        try {
            await setDoc(userDocRef, {
                name,
                birthDate: birthDate ? new Date(birthDate) : null,
                birthTime,
                birthPlace,
                bloodType,
                mbtiType, // Save MBTI type
                updatedAt: new Date(),
                hasSharedForAdSkip: hasSharedForAdSkip // Save current ad skip status
            }, { merge: true });
            console.log("ユーザーデータが保存されました！");
            setErrorMessage("");
            setShowSaveSuccess(true);
            setTimeout(() => setShowSaveSuccess(false), 3000); // Hide message after 3 seconds
        } catch (error) {
            console.error("ユーザーデータの保存に失敗しました:", error);
            setErrorMessage("ユーザーデータの保存に失敗しました。");
        }
    };

    // New function to update only ad skip status
    const updateUserAdSkipStatus = async (status) => {
        if (!db || !userId) {
            console.error("ユーザーが認証されていません。広告スキップステータスを更新できません。");
            return;
        }
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'; // Canvas環境変数を取得
        const userDocRef = doc(db, `artifacts/${appId}/users/${userId}/user_data/profile`);
        try {
            await setDoc(userDocRef, { hasSharedForAdSkip: status }, { merge: true });
            setHasSharedForAdSkip(status);
            console.log("広告スキップステータスが更新されました:", status);
        } catch (error) {
            console.error("広告スキップステータスの更新に失敗しました:", error);
        }
    };

    // --- Fortune History Management (Firestore) ---
    const loadFortuneHistory = (firestore, uid) => {
        if (!firestore || !uid) return;
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'; // Canvas環境変数を取得
        const historyCollectionRef = collection(firestore, `artifacts/${appId}/users/${uid}/fortune_history`);
        const q = query(historyCollectionRef, orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const history = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setFortuneHistory(history);
        }, (error) => {
            console.error("占い履歴の読み込みに失敗しました:", error);
            setErrorMessage("占い履歴の読み込みに失敗しました。");
        });
        return unsubscribe;
    };

    const saveFortuneResult = async (resultText, category, inputData, tarotCards = []) => {
        if (!db || !userId) {
            setErrorMessage("ユーザーが認証されていません。");
            return;
        }
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'; // Canvas環境変数を取得
        const historyCollectionRef = collection(db, `artifacts/${appId}/users/${userId}/fortune_history`); // Changed uid to userId
        try {
            await addDoc(historyCollectionRef, {
                fortuneCategory: category,
                inputData: inputData,
                fortuneResult: resultText,
                tarotCards: tarotCards.map(card => ({ name: card.name, position: card.position, isReversed: card.isReversed })), // Save relevant tarot info
                timestamp: new Date(),
            });
            console.log("占い結果が履歴に保存されました！");
        } catch (error) {
            console.error("占い結果の保存に失敗しました:", error);
            setErrorMessage("占い結果の保存に失敗しました。");
        }
    };

    const handleDeleteFortune = async () => {
        if (!db || !userId || !itemToDelete) {
            setErrorMessage("削除できませんでした。");
            return;
        }
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'; // Canvas環境変数を取得
        try {
            await deleteDoc(doc(db, `artifacts/${appId}/users/${userId}/fortune_history`, itemToDelete.id));
            console.log("占い履歴が削除されました！");
            setErrorMessage("");
        } catch (error) {
            console.error("占い履歴の削除に失敗しました:", error);
            setErrorMessage("占い履歴の削除に失敗しました。");
        } finally {
            setShowConfirmDelete(false);
            setItemToDelete(null);
        }
    };

    const openDeleteConfirm = (item) => {
        setItemToDelete(item);
        setShowConfirmDelete(true);
    };

    const closeDeleteConfirm = () => {
        setShowConfirmDelete(false);
        setItemToDelete(null);
    };

    // --- Numerology Calculation ---
    const calculateLifePathNumber = (birthDateString) => {
        if (!birthDateString) return null;
        let date = new Date(birthDateString);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        const reduceNumber = (num) => {
            while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
                num = String(num).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
            }
            return num;
        };

        const reducedYear = reduceNumber(year);
        const reducedMonth = reduceNumber(month);
        const reducedDay = reduceNumber(day);

        const lifePath = reduceNumber(reducedYear + reducedMonth + reducedDay);
        return lifePath;
    };

    // --- Tarot Card Drawing ---
    const handleDrawTarotCards = () => {
        setIsDrawingTarot(true);
        setDrawnTarotCards([]); // Clear previous cards immediately for animation
        setFortuneResult(''); // Clear previous fortune result

        const shuffledDeck = [...tarotDeck].sort(() => 0.5 - Math.random());
        const selected = [
            { card: shuffledDeck[0], position: '過去 (Past)' },
            { card: shuffledDeck[1], position: '現在 (Present)' },
            { card: shuffledDeck[2], position: '未来 (Future)' },
        ];

        let drawn = [];
        selected.forEach((s, index) => {
            setTimeout(() => {
                const isReversed = Math.random() < 0.5; // 50% chance for reversed
                drawn.push({ name: s.card.name, position: s.position, isReversed: isReversed });
                setDrawnTarotCards([...drawn]);
                if (index === selected.length - 1) {
                    setIsDrawingTarot(false);
                }
            }, 500 * (index + 1));
        });
    };

    // --- Fortune Generation (AI Integration) ---
    const generateFortuneText = async (category, drawnCards) => {
        const userDataForPrompt = {
            name,
            birthDate,
            birthTime: birthTime || '不明',
            birthPlace: birthPlace || '不明',
            bloodType,
            mbtiType,
            fortuneCategory: category,
        };

        const lifePathNumber = calculateLifePathNumber(userDataForPrompt.birthDate);

        // --- Advanced Astrological Data (AI Interpretation Prompt) ---
        // Instead of calculating, instruct AI to interpret based on provided data
        // and its knowledge of astrology.
        const getSunSign = (dateString) => {
            const date = new Date(dateString);
            const month = date.getMonth() + 1; // 1-12
            const day = date.getDate();

            if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "牡羊座 (Aries)";
            if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "牡牛座 (Taurus)";
            if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "双子座 (Gemini)";
            if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "蟹座 (Cancer)";
            if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "獅子座 (Leo)";
            if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "乙女座 (Virgo)";
            if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "天秤座 (Libra)";
            if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "蠍座 (Scorpio)";
            if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "射手座 (Sagittarius)";
            if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "山羊座 (Capricorn)";
            if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "水瓶座 (Aquarius)";
            if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "魚座 (Pisces)";
            return "不明";
        };
        const sunSign = getSunSign(userDataForPrompt.birthDate);
        
        let astrologicalNotes = `太陽星座: ${sunSign}。\n`;
        astrologicalNotes += `出生時刻: ${userDataForPrompt.birthTime !== '不明' ? userDataForPrompt.birthTime : '不明'}。出生地: ${userDataForPrompt.birthPlace !== '' ? userDataForPrompt.birthPlace : '不明'}。\n`;
        astrologicalNotes += `これらの情報（特に正確な出生時刻と出生地が不明な場合は、太陽星座と心理学的特性を重視）に基づき、月星座、アセンダント、主要な惑星（水星、金星、火星など）のサインや、それらがどのハウスにあるか（一般的な解釈で良い）、そして主要なアスペクト（例: コンジャンジョン、オポジション、スクエア、トライン、セクスタイル）の可能性を占星術の知識を総動員して想像し、あなたの洞察に含めてください。\n`;
        astrologicalNotes += `具体的に、ユーザーのMBTIタイプや血液型との関連性も踏まえ、行動傾向や内面世界を深く読み解いてください。`;

        let tarotInfo = '';
        if (drawnCards.length > 0) {
            tarotInfo = '\n**引かれたタロットカードとそのポジション:**\n';
            drawnCards.forEach(card => {
                tarotInfo += `  - ${card.position}: ${card.name} (${card.isReversed ? '逆位置' : '正位置'})\n`;
            });
            tarotInfo += '\nこれらのカードの正位置・逆位置の意味と、それらがユーザーの現状、課題、未来にどう影響するかを深く読み解いてください。特に、タロットは潜在意識や状況の流れを示すため、この点も考慮に入れてください。\n';
        }


        let promptContent = `あなたは経験豊富なプロの占い師です。以下のユーザー情報、詳細な占星術の概念、数秘術のデータ、MBTIタイプ、血液型${drawnCards.length > 0 ? '、そして引かれたタロットカード' : ''}に基づき、${userDataForPrompt.fortuneCategory}について、具体的で示唆に富む、心理統計に基づいた深みのある占い結果を日本語で生成してください。当たり障りのない言葉や定型文は避け、本気で当てに行く内容で、ユーザーの自己理解と成長を促すトーンで記述してください。

占い結果はMarkdown形式で、必ず小見出し（###）と段落（空行で区切る）を使用して、非常に読みやすく構成してください。
**ユーザーのプロフィール:**
**血液型:** ${userDataForPrompt.bloodType}型
**MBTIタイプ:** ${userDataForPrompt.mbtiType}

特に${userDataForPrompt.fortuneCategory}に関する結果を強調し、必要に応じてその他の関連する運勢（例：総合運、恋愛運など）についても言及してください。

---
ユーザー名: ${userDataForPrompt.name}
生年月日: ${userDataForPrompt.birthDate}${userDataForPrompt.birthTime !== '不明' ? ` (${userDataForPrompt.birthTime}生)` : ''}
出生地: ${userDataForPrompt.birthPlace}

占星術データ:
  ${astrologicalNotes}

数秘術データ:
  ライフパスナンバー: ${lifePathNumber !== null ? lifePathNumber : '計算不能'}
  （名前からの運命数など、より詳細な数秘術データがここに入ります。）
${tarotInfo}
---

### ${userDataForPrompt.fortuneCategory}の運勢
`;

        promptContent += `\n\n### まとめ
この占い結果の最も重要なポイントを2〜3文で簡潔に要約してください。`;


        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: promptContent }] });
        const payload = { contents: chatHistory };
        const apiKey = ""; 
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json(); // await を追加

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const text = result.candidates[0].content.parts[0].text; // ここでtextを取得
            return text; // textを返す
        } else {
            throw new Error("AI生成結果の構造が予期せぬものでした。");
        }
    };

    const handleFortuneRequest = async () => {
        if (!name || !birthDate || !selectedFortuneCategory) {
            setErrorMessage("名前、生年月日、占いのジャンルは必須です。");
            return;
        }
        if (!db || !userId) { // userIdの存在チェックを追加
            setErrorMessage("ユーザーが認証されていません。しばらくお待ちください。");
            return;
        }

        setIsLoadingFortune(true);
        setErrorMessage('');
        setFortuneResult('');

        try {
            const text = await generateFortuneText(selectedFortuneCategory, drawnTarotCards);
            setFortuneResult(text);
            saveFortuneResult(text, selectedFortuneCategory, { name, birthDate, birthTime, birthPlace, bloodType, mbtiType }, drawnTarotCards);
            if (resultSectionRef.current) {
                resultSectionRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (error) {
            console.error("占い結果の生成中にエラーが発生しました:", error);
            setErrorMessage("占い結果の生成中にエラーが発生しました。");
        } finally {
            setIsLoadingFortune(false);
        }
    };
    
    // --- Ad Modal Logic ---
    const startNewFortuneAfterAd = () => {
        // Reset states for a new fortune
        setFortuneResult('');
        setDrawnTarotCards([]); // Clear drawn cards
        // selectedFortuneCategory is intentionally NOT cleared to allow immediate re-draw/fortune in same category
        setErrorMessage('');
        setShowAdModal(false);
        setAdTimer(0);
        // Optionally scroll back to input section
        if (inputSectionRef.current) {
            inputSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleAnotherFortuneRequest = () => {
        // Check if user has shared before
        if (hasSharedForAdSkip) {
            console.log("広告スキップ権限あり、広告をスキップします。");
            startNewFortuneAfterAd();
            return;
        }

        setShowAdModal(true);
        setAdTimer(AD_DURATION);
    };

    useEffect(() => {
        let timerId;
        if (showAdModal && adTimer > 0) {
            timerId = setTimeout(() => {
                setAdTimer(prev => prev - 1);
            }, 1000);
        } else if (showAdModal && adTimer === 0) {
            startNewFortuneAfterAd();
        }
        return () => clearTimeout(timerId);
    }, [showAdModal, adTimer, hasSharedForAdSkip]); // Re-run effect if hasSharedForAdSkip changes

    // --- Share Functionality ---
    const getSummaryFromMarkdown = (markdownText) => {
        const summaryHeader = "### まとめ";
        const startIndex = markdownText.indexOf(summaryHeader);
        if (startIndex !== -1) {
            let summaryContent = markdownText.substring(startIndex + summaryHeader.length).trim();
            const nextHeadingIndex = summaryContent.indexOf("###", 1);
            if (nextHeadingIndex !== -1) {
                summaryContent = summaryContent.substring(0, nextHeadingIndex).trim();
            }
            const lines = summaryContent.split('\n').filter(line => line.trim() !== '');
            let briefSummary = lines.slice(0, 2).join(' ').trim();
            
            briefSummary = briefSummary.replace(/#+\s*/g, '').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*\*/g, '$1');

            if (briefSummary.length > 80) { // Keep summary short for social
                briefSummary = briefSummary.substring(0, 80) + '...';
            }
            return briefSummary;
        }
        return "";
    };

    const shareFortune = (platform) => {
        if (!fortuneResult) {
            setErrorMessage("シェアする占い結果がありません。");
            return;
        }

        const summaryForShare = getSummaryFromMarkdown(fortuneResult);

        // Optimized X (Twitter) share text to be catchy and fit character limits
        // 280 chars limit. URLs become 23 chars. Hash tags count.
        const twitterBaseText = `驚愕の的中率！私のAI占いはコレ🔮✨\n\nジャンル: ${selectedFortuneCategory}`;
        const twitterSummary = summaryForShare ? `\n【まとめ】${summaryForShare}` : '';
        const twitterTags = `#AI占い #本格占い`;
        let twitterText = `${twitterBaseText}${twitterSummary}\n${twitterTags}`;
        
        // Trim to fit common limits if summary makes it too long
        // Max 280 chars for Twitter including URL (23 chars for URL)
        const URL_PLACEHOLDER_LENGTH = 23;
        const availableCharsForText = 280 - URL_PLACEHOLDER_LENGTH; // Rough estimate for safety

        if (twitterText.length > availableCharsForText) {
            twitterText = twitterText.substring(0, availableCharsForText - 3) + '...'; // Leave space for '...'
        }


        const shareUrl = window.location.href;

        let url = '';
        switch (platform) {
            case 'twitter':
                url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(shareUrl)}`;
                break;
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(twitterBaseText + twitterSummary)}`; // Facebook has higher quote limit, but keep consistent
                break;
            case 'line':
                url = `https://line.me/R/share?text=${encodeURIComponent(twitterBaseText + twitterSummary + '\n' + shareUrl + '\n' + tags)}`;
                break;
            case 'copy':
                const copyContent = `🔮✨ 学術的AI占い結果 ✨🔮\n\nジャンル: ${selectedFortuneCategory}\n\n${fortuneResult}\n\n${twitterTags}\n${shareUrl}`;
                const tempInput = document.createElement('textarea');
                tempInput.value = copyContent;
                document.body.appendChild(tempInput);
                tempInput.select();
                try {
                    document.execCommand('copy');
                    alert('占い結果のリンクと内容がクリップボードにコピーされました！');
                } catch (err) {
                    console.error('Failed to copy: ', err);
                    alert('コピーに失敗しました。');
                }
                document.body.removeChild(tempInput);
                // After copying, update ad skip status if ad is currently showing
                if (showAdModal) {
                    updateUserAdSkipStatus(true);
                }
                return;
            default:
                return;
        }
        window.open(url, '_blank');
        
        // Ad skip logic after successful share (assuming the share action happened because of ad gate)
        if (showAdModal) {
            updateUserAdSkipStatus(true); // User shared, so they get ad skip permission
        }
    };

    // --- Scroll Function ---
    const scrollToRef = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Determine when to show the Tarot Draw button
    const isInputReady = name && birthDate && selectedFortuneCategory;
    const canShowTarotDrawButton = isInputReady && !isLoadingFortune && drawnTarotCards.length === 0 && !isDrawingTarot && fortuneResult === '';
    // Fortune button visible only if input is ready AND (tarot cards are drawn OR tarot draw is not shown/skipped for current session) AND not currently loading
    const canShowFortuneButton = isInputReady && !isDrawingTarot && !isLoadingFortune && drawnTarotCards.length > 0 && fortuneResult === '';


    if (loadingFirebase) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="text-center">
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-purple-400" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-xl font-semibold text-gray-300 mt-4">アプリを初期化中...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-950 p-4 sm:p-8 font-inter">
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slide-down {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
                .animate-slide-down { animation: slide-down 0.5s ease-out forwards; }
                .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }

                /* Spinner styles */
                .spinner-border {
                    border-top-color: currentColor;
                    border-right-color: transparent;
                    border-bottom-color: transparent;
                    border-left-color: currentColor;
                }
                .tarot-card {
                    width: 80px; /* Adjust size as needed */
                    height: 120px; /* Adjust size as needed */
                    border: 2px solid #a78bfa; /* Purple border */
                    border-radius: 8px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background-color: #2d2d3a;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                    flex-shrink: 0; /* Prevent shrinking in flex container */
                    opacity: 0; /* Hidden by default for animation */
                    transform: translateY(20px) rotateX(90deg); /* Start off-screen and rotated */
                    animation: card-reveal 0.5s ease-out forwards; /* Apply reveal animation */
                    transition: transform 0.3s ease-in-out; /* Smooth transition for reversal */
                }
                .tarot-card.reversed { /* Apply to the whole card container for reversal */
                    transform: rotate(180deg);
                }
                /* Ensure history cards also respect reversal */
                .tarot-card-history { /* Base style for history cards to not inherit reveal animation */
                    width: 60px;
                    height: 90px;
                    border: 2px solid #a78bfa;
                    border-radius: 8px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background-color: #2d2d3a;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    flex-shrink: 0;
                    opacity: 1; /* Always visible */
                    transform: none; /* No initial transform */
                    transition: transform 0.3s ease-in-out; /* Smooth transition for reversal */
                }
                .tarot-card-history.reversed {
                    transform: rotate(180deg);
                }

                .tarot-card .card-name-display { /* Specific class for the card name inside */
                    text-align: center;
                    font-size: 0.8rem; /* Smaller font for better fit */
                    line-height: 1.1;
                    padding: 0 2px; /* Small padding */
                    word-break: break-word; /* Allow breaking words */
                    white-space: normal; /* Allow normal wrapping */
                }
                .tarot-card-history .card-name-display {
                    font-size: 0.6rem; /* Even smaller for history */
                    line-height: 1;
                }
                
                @keyframes card-reveal {
                    0% {
                        opacity: 0;
                        transform: translateY(20px) rotateX(90deg);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) rotateX(0deg);
                    }
                }

                /* New loading animation styles - Crystal Ball */
                .loading-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.9); /* Darker overlay */
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    color: white;
                    font-size: 1.5rem;
                }

                .crystal-ball {
                    width: 100px;
                    height: 100px;
                    background: radial-gradient(circle at 30% 30%, #a78bfa, #6d28d9); /* Inner glow */
                    border-radius: 50%;
                    position: relative;
                    box-shadow: 0 0 30px #d8b4fe, inset 0 0 15px #e9d5ff; /* Outer glow and inner light */
                    animation: pulse-glow 2s infinite alternate ease-in-out;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 3rem;
                    margin-bottom: 2rem;
                }

                .crystal-ball::before {
                    content: '';
                    position: absolute;
                    top: 10%;
                    left: 10%;
                    width: 80%;
                    height: 80%;
                    border-radius: 50%;
                    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%);
                    filter: blur(5px);
                }

                @keyframes pulse-glow {
                    0% {
                        box-shadow: 0 0 30px #d8b4fe, inset 0 0 15px #e9d5ff;
                        transform: scale(1);
                    }
                    100% {
                        box-shadow: 0 0 45px #d8b4fe, inset 0 0 20px #e9d5ff;
                        transform: scale(1.05);
                    }
                }
            `}</style>
            
            {/* Loading Overlay Animation */}
            {isLoadingFortune && (
                <div className="loading-overlay">
                    <div className="crystal-ball">
                        <span role="img" aria-label="crystal ball">🔮</span>
                    </div>
                    <p className="text-xl font-semibold text-gray-300 loading-text">運命の導きを生成中...</p>
                    <p className="text-md text-gray-400 mt-2 loading-text">AIがあなたのデータを深く読み解いています。</p>
                </div>
            )}

            {/* Ad Modal */}
            {showAdModal && (
                <div className="loading-overlay">
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white">
                        <h2 className="text-3xl font-bold mb-4">広告表示中</h2>
                        <p className="text-xl mb-8">次の占いまであと {adTimer} 秒...</p>
                        {/* 運命の人に会えるかも❣会員数1500万人の出会いマッチングサイト‼ の文言を追加 */}
                        <p className="text-xl font-bold text-center text-yellow-300 mb-4 animate-pulse">
                            運命の人に会えるかも❣会員数1500万人の出会いマッチングサイト‼
                        </p>
                        {/* A8.net バナー広告のコードを直接埋め込み - サイズ調整 */}
                        <div className="my-4 flex justify-center items-center" style={{ width: '320px', height: '280px', overflow: 'hidden' }}>
                            <a href="https://px.a8.net/svt/ejp?a8mat=457HK0+6TW1MA+22QA+I47XT" rel="nofollow" target="_blank"> {/* target="_blank" を追加し、別タブで開くように */}
                            <img border="0" width="320" height="280" alt="美容系広告" src="https://www28.a8.net/svt/bgt?aid=250612128413&wid=001&eno=01&mid=s00000009685003043000&mc=1"/></a>
                            <img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=457HK0+6TW1MA+22QA+I47XT" alt="トラッキングピクセル" style={{ display: 'none' }}/> {/* トラッキングピクセルは非表示に */}
                        </div>
                        <p className="text-sm text-gray-500 mt-2">SNSでシェアすると、広告をスキップできます！</p>
                         {/* Share Buttons on Ad Modal */}
                        <div className="text-center mt-8 space-x-1 sm:space-x-2 flex flex-wrap justify-center gap-y-2"> {/* Adjusted spacing and min-width */}
                            <button
                                onClick={() => shareFortune('twitter')}
                                className="bg-blue-400 text-white p-2 rounded-md font-semibold text-sm hover:bg-blue-500 transition duration-300 shadow-md flex items-center justify-center min-w-[100px]"
                            >
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.14L9.35 12.98 2.464 22H0l8.09-10.702L0 2.25h8.322L12.5 7.398 18.244 2.25zM17.272 20l-1.895-2.656-7.147-9.99H5.503L13.181 20H17.272z" /></svg>
                                X (Twitter)
                            </button>
                            <button
                                onClick={() => shareFortune('facebook')}
                                className="bg-blue-700 text-white p-2 rounded-md font-semibold text-sm hover:bg-blue-800 transition duration-300 shadow-md flex items-center justify-center min-w-[100px]"
                            >
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 .5-2.5h2V7.472s-1.5-.164-2.75-.164c-2.68 0-4.5 1.6-4.5 4.75V13.5H6v4h3.5v6.5h4V17.5h3.5l1-4H14z" /></svg>
                                Facebook
                            </button>
                            <button
                                onClick={() => shareFortune('line')}
                                className="bg-green-500 text-white p-2 rounded-md font-semibold text-sm hover:bg-green-600 transition duration-300 shadow-md flex items-center justify-center min-w-[100px]"
                            >
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M11.996 2C6.475 2 2 6.477 2 12s4.475 10 9.996 10C17.525 22 22 17.523 22 12S17.525 2 11.996 2zM12 20c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zM14.28 9.544l-2.072 2.072L9.136 9.544a.75.75 0 00-1.06 1.06l2.072 2.072-2.072 2.072a.75.75 0 001.06 1.06l2.072-2.072 2.072 2.072a.75.75 0 001.06-1.06l-2.072-2.072 2.072-2.072a.75.75 0 00-1.06-1.06z" clipRule="evenodd" /></svg>
                                LINE
                            </button>
                            <button
                                onClick={() => shareFortune('copy')}
                                className="bg-gray-600 text-white p-2 rounded-md font-semibold text-sm hover:bg-gray-700 transition duration-300 shadow-md flex items-center justify-center min-w-[100px]"
                            >
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7H5c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-2h2v-8c0-1.103-.897-2-2-2h-8zm10 2h-6V7h6v2zm-2 4h-6V9h6v4z" clipRule="evenodd" /></svg>
                                コピー
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-80 p-3 z-40 shadow-lg flex justify-center space-x-4 rounded-b-lg">
                <button
                    onClick={() => scrollToRef(inputSectionRef)}
                    className="text-gray-200 hover:text-purple-400 font-semibold text-sm sm:text-base px-3 py-2 rounded-md transition duration-200"
                >
                    入力
                </button>
                <button
                    onClick={() => scrollToRef(resultSectionRef)}
                    className="text-gray-200 hover:text-purple-400 font-semibold text-sm sm:text-base px-3 py-2 rounded-md transition duration-200"
                >
                    結果
                </button>
                <button
                    onClick={() => scrollToRef(historySectionRef)}
                    className="text-gray-200 hover:text-purple-400 font-semibold text-sm sm:text-base px-3 py-2 rounded-md transition duration-200"
                >
                    履歴
                </button>
            </div>


            <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg p-6 sm:p-10 border border-purple-700 mt-16"> {/* Add mt-16 to offset fixed header */}
                <div className="text-center mb-6">
                    {/* Logo Placeholder */}
                    <div className="h-20 w-20 mx-auto bg-purple-600 rounded-full flex items-center justify-center mb-4 shadow-xl">
                        <span className="text-white text-3xl font-bold">🔮</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-purple-300 mb-6 animate-fade-in">
                        学術的AI占い：あなたの運命を深く読み解く
                    </h1>
                </div>

                {errorMessage && (
                    <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-md mb-6 animate-slide-down" role="alert">
                        <p className="font-bold">エラー:</p>
                        <p>{errorMessage}</p>
                    </div>
                )}

                {/* 免責事項 - Updated for Marketing */}
                <div className="mb-8 p-4 bg-yellow-900 border border-yellow-700 text-yellow-200 rounded-md text-sm">
                    <p className="font-semibold mb-2">【これまでにない究極の占い体験へ！】</p>
                    <p>このアプリは、**心理統計学**、**伝統的な占術（占星術、数秘術、タロット）**、そして**最先端のAI技術**を総合的に組み合わせた、まさに「最強」の占いツールです。あなたの名前、生年月日、血液型、MBTIタイプといったパーソナルデータから、AIが深層を分析し、当たり障りのない言葉ではない、本当にあなたに響く示唆に富んだ洞察をお届けします。あなたの自己理解を深め、未来を切り開くための羅針盤としてご活用ください。MBTIタイプは自己理解に非常に有用ですが、科学的妥当性には限定的な側面があることをご理解の上、お楽しみください。</p>
                </div>

                <div ref={inputSectionRef} className="space-y-6 mb-8 pt-4"> {/* Added ref and pt-4 for scroll offset */}
                    <h2 className="text-2xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">パーソナルデータの入力</h2>
                    {/* ユーザーID表示 */}
                    <div className="p-3 bg-blue-900 border border-blue-700 text-blue-200 rounded-md text-sm">
                        <p className="font-semibold">現在のユーザーID: <span className="font-mono break-all">{userId || 'N/A'}</span></p>
                        <p>（このIDはアプリ内であなたを識別するために使用されます。）</p>
                    </div>

                    {/* 名前 */}
                    <div>
                        <label htmlFor="name" className="block text-gray-200 text-lg font-medium mb-2">名前 <span className="text-red-400">*</span></label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                            placeholder="あなたの名前を入力してください"
                        />
                    </div>

                    {/* 生年月日 */}
                    <div>
                        <label htmlFor="birthDate" className="block text-gray-200 text-lg font-medium mb-2">生年月日 <span className="text-red-400">*</span></label>
                        <input
                            type="date"
                            id="birthDate"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                        />
                    </div>

                    {/* 出生時刻 */}
                    <div>
                        <label htmlFor="birthTime" className="block text-gray-200 text-lg font-medium mb-2">出生時刻 <span className="text-gray-400 text-sm">(不明な場合は空欄でOK)</span></label>
                        <input
                            type="time"
                            id="birthTime"
                            value={birthTime}
                            onChange={(e) => setBirthTime(e.target.value)}
                            className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                        />
                    </div>

                    {/* 出生地 */}
                    <div>
                        <label htmlFor="birthPlace" className="block text-gray-200 text-lg font-medium mb-2">出生地 <span className="text-gray-400 text-sm">(例: 東京都)</span></label>
                        <input
                            type="text"
                            id="birthPlace"
                            value={birthPlace}
                            onChange={(e) => setBirthPlace(e.target.value)}
                            className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                            placeholder="都道府県名または市町村名"
                        />
                    </div>

                    {/* 血液型 */}
                    <div>
                        <label htmlFor="bloodType" className="block text-gray-200 text-lg font-medium mb-2">血液型</label>
                        <select
                            id="bloodType"
                            value={bloodType}
                            onChange={(e) => setBloodType(e.target.value)}
                            className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                        >
                            {bloodTypeOptions.map(type => (
                                <option key={type} value={type}>{type}型</option>
                            ))}
                        </select>
                    </div>

                    {/* MBTIタイプ */}
                    <div>
                        <label htmlFor="mbtiType" className="block text-gray-200 text-lg font-medium mb-2">
                            MBTIタイプ <span className="text-gray-400 text-sm">
                                (<a href="https://www.16personalities.com/ja/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">16Personalities</a>などで診断後選択)
                            </span>
                        </label>
                        <select
                            id="mbtiType"
                            value={mbtiType}
                            onChange={(e) => setMbtiType(e.target.value)}
                            className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                        >
                            {mbtiOptions.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* ユーザーデータ保存ボタン */}
                    <button
                        onClick={saveUserData}
                        className="w-full bg-blue-700 text-white p-3 rounded-md font-semibold hover:bg-blue-800 transition duration-300 transform hover:scale-105 shadow-md"
                    >
                        入力情報を保存
                    </button>
                    {showSaveSuccess && (
                        <p className="text-green-400 text-center text-sm mt-2 animate-fade-in">保存しました！</p>
                    )}

                    {/* 占いジャンル選択 */}
                    <div>
                        <label htmlFor="fortuneCategory" className="block text-gray-200 text-lg font-medium mb-2">占いたいジャンル <span className="text-red-400">*</span></label>
                        <select
                            id="fortuneCategory"
                            value={selectedFortuneCategory}
                            onChange={(e) => {
                                setSelectedFortuneCategory(e.target.value);
                                setDrawnTarotCards([]); // Clear cards if category changes
                                setFortuneResult(''); // Clear previous fortune result
                            }}
                            className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                        >
                            {fortuneCategories.map(category => (
                                <option key={category.value} value={category.value}>{category.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Conditional Buttons based on input completion and tarot draw status */}
                    {canShowTarotDrawButton && (
                        <div className="text-center mt-6">
                            <button
                                onClick={handleDrawTarotCards}
                                disabled={isLoadingFortune || isDrawingTarot}
                                className={`w-full p-4 rounded-md font-bold text-lg shadow-lg transform transition duration-300 ${
                                    isLoadingFortune || isDrawingTarot
                                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                        : 'bg-indigo-700 text-white hover:bg-indigo-800 hover:scale-105'
                                }`}
                            >
                                {isDrawingTarot ? 'カードを選んでいます...' : 'タロットカードを引く (3枚)'}
                            </button>
                        </div>
                    )}

                    {/* Display Drawn Tarot Cards */}
                    {drawnTarotCards.length > 0 && (
                        <div className="mt-6 p-4 border border-purple-600 rounded-md bg-gray-700 text-gray-100 text-center">
                            <h3 className="text-xl font-bold text-purple-300 mb-4">引かれたタロットカード</h3>
                            <div className="flex flex-wrap justify-center gap-4">
                                {drawnTarotCards.map((card, index) => (
                                    <div key={index} className={`tarot-card p-2 text-center text-sm ${card.isReversed ? 'reversed' : ''}`} style={{animationDelay: `${0.2 + index * 0.5}s`}}>
                                        <p className="font-semibold text-purple-200 card-name-display">{card.name}</p>
                                        <p className="text-gray-400 text-xs">({card.position})</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-gray-400 mt-4">これらのカードがあなたの占いに組み込まれます。</p>
                        </div>
                    )}


                    {/* 占い実行ボタン */}
                    {canShowFortuneButton && (
                         <button
                            onClick={handleFortuneRequest}
                            disabled={isLoadingFortune || !selectedFortuneCategory}
                            className={`w-full p-4 rounded-md font-bold text-lg shadow-lg transform transition duration-300 ${
                                isLoadingFortune || !selectedFortuneCategory
                                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    : 'bg-purple-700 text-white hover:bg-purple-800 hover:scale-105'
                            }`}
                        >
                            {isLoadingFortune ? (
                                <div className="flex items-center justify-center">
                                    <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full text-white" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <span className="ml-3">占い結果を生成中...</span>
                                </div>
                            ) : (drawnTarotCards.length > 0 ? 'タロットとAIで占う！' : 'AIで占う！')}
                        </button>
                    )}
                </div>

                {/* 占い結果表示 */}
                {fortuneResult && (
                    <div ref={resultSectionRef} className="bg-gray-700 border border-purple-700 rounded-xl p-6 sm:p-8 shadow-inner mt-8 animate-fade-in-up pt-4">
                        <h2 className="text-2xl sm:text-3xl font-bold text-purple-300 mb-4 text-center border-b border-gray-600 pb-2">あなたの占い結果</h2>
                        <div className="prose prose-invert lg:prose-lg mx-auto text-gray-100 leading-relaxed break-words">
                            <div dangerouslySetInnerHTML={{ __html: fortuneResult.replace(/\n/g, '<br/>') }} />
                        </div>

                        {/* Button for Another Fortune (Ad Gate) */}
                        <div className="text-center mt-8">
                            <button
                                onClick={handleAnotherFortuneRequest}
                                className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-3 rounded-md font-semibold hover:from-green-600 hover:to-teal-600 transition duration-300 shadow-xl transform hover:scale-105"
                            >
                                別の項目を占う
                            </button>
                        </div>

                        {/* Share Buttons */}
                        <div className="text-center mt-8 space-x-2 sm:space-x-4 flex flex-wrap justify-center gap-y-3">
                            <button
                                onClick={() => shareFortune('twitter')}
                                className="bg-blue-400 text-white p-3 rounded-md font-semibold hover:bg-blue-500 transition duration-300 shadow-md flex-1 inline-flex items-center justify-center min-w-[150px] sm:min-w-0"
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.14L9.35 12.98 2.464 22H0l8.09-10.702L0 2.25h8.322L12.5 7.398 18.244 2.25zM17.272 20l-1.895-2.656-7.147-9.99H5.503L13.181 20H17.272z" /></svg>
                                X (Twitter)でシェア
                            </button>
                            <button
                                onClick={() => shareFortune('facebook')}
                                className="bg-blue-700 text-white p-3 rounded-md font-semibold hover:bg-blue-800 transition duration-300 shadow-md flex-1 inline-flex items-center justify-center min-w-[150px] sm:min-w-0"
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 .5-2.5h2V7.472s-1.5-.164-2.75-.164c-2.68 0-4.5 1.6-4.5 4.75V13.5H6v4h3.5v6.5h4V17.5h3.5l1-4H14z" /></svg>
                                Facebookでシェア
                            </button>
                            <button
                                onClick={() => shareFortune('line')}
                                className="bg-green-500 text-white p-3 rounded-md font-semibold hover:bg-green-600 transition duration-300 shadow-md flex-1 inline-flex items-center justify-center min-w-[150px] sm:min-w-0"
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M11.996 2C6.475 2 2 6.477 2 12s4.475 10 9.996 10C17.525 22 22 17.523 22 12S17.525 2 11.996 2zM12 20c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zM14.28 9.544l-2.072 2.072L9.136 9.544a.75.75 0 00-1.06 1.06l2.072 2.072-2.072 2.072a.75.75 0 001.06 1.06l2.072-2.072 2.072 2.072a.75.75 0 001.06-1.06l-2.072-2.072 2.072-2.072a.75.75 0 00-1.06-1.06z" clipRule="evenodd" /></svg>
                                LINEでシェア
                            </button>
                            <button
                                onClick={() => shareFortune('copy')}
                                className="bg-gray-600 text-white p-3 rounded-md font-semibold hover:bg-gray-700 transition duration-300 shadow-md flex-1 inline-flex items-center justify-center min-w-[150px] sm:min-w-0"
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7H5c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-2h2v-8c0-1.103-.897-2-2-2h-8zm10 2h-6V7h6v2zm-2 4h-6V9h6v4z" clipRule="evenodd" /></svg>
                                コピー
                            </button>
                        </div>
                    </div>
                )}

                {/* 占い履歴表示 */}
                {fortuneHistory.length > 0 && (
                    <div ref={historySectionRef} className="mt-12 bg-gray-800 rounded-xl shadow-lg p-6 sm:p-10 border border-gray-700 pt-4">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-200 mb-6 text-center border-b border-gray-700 pb-2">
                            あなたの占い履歴
                        </h2>
                        <div className="space-y-6">
                            {fortuneHistory.map((entry) => (
                                <div key={entry.id} className="bg-gray-700 border border-gray-600 rounded-lg p-4 shadow-sm">
                                    <p className="text-sm text-gray-400 mb-1">
                                        {new Date(entry.timestamp.toDate()).toLocaleString()}
                                    </p>
                                    <p className="text-lg font-semibold text-purple-300 mb-2">
                                        ジャンル: {entry.fortuneCategory}
                                    </p>
                                    {entry.tarotCards && entry.tarotCards.length > 0 && (
                                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                                            {entry.tarotCards.map((card, idx) => (
                                                <div key={idx} className={`tarot-card-history p-1 text-center text-xs ${card.isReversed ? 'reversed' : ''}`}>
                                                    <p className="font-bold text-purple-200 card-name-display">{card.name}</p>
                                                    <p className="text-gray-400 text-xs">({card.position})</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="prose prose-sm max-w-none text-gray-300">
                                        <div dangerouslySetInnerHTML={{ __html: entry.fortuneResult.replace(/\n/g, '<br/>') }} />
                                    </div>
                                    <button
                                        onClick={() => openDeleteConfirm(entry)}
                                        className="mt-3 text-red-400 hover:text-red-500 text-sm"
                                    >
                                        削除
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Custom Confirmation Dialog for Delete */}
                {showConfirmDelete && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 text-center">
                            <p className="text-xl font-semibold text-gray-100 mb-6">この占い履歴を削除しますか？</p>
                            <div className="flex justify-center space-x-4">
                                <button
                                    onClick={handleDeleteFortune}
                                    className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700 transition duration-300"
                                >
                                    はい、削除します
                                </button>
                                <button
                                    onClick={closeDeleteConfirm}
                                    className="bg-gray-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-700 transition duration-300"
                                >
                                    キャンセル
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
