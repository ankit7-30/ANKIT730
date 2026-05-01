import { 
  collection, 
  addDoc, 
  updateDoc, 
  setDoc,
  deleteDoc, 
  doc, 
  getDoc,
  getDocs, 
  query, 
  orderBy, 
  limit, 
  where,
  Timestamp,
  serverTimestamp 
} from "firebase/firestore";

import { db } from "./firebase";


// --- YOUTUBE SERVICE ---
export const youtubeService = {
  async getAll() {
    const q = query(collection(db, "youtube"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  async add(video: any) {
    return await addDoc(collection(db, "youtube"), { 
      ...video, 
      author: "Ankit Yadav",
      platform: "Personal Hub",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp() 
    });
  },
  async update(id: string, data: any) {
    const docRef = doc(db, "youtube", id);
    return await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  },
  async delete(id: string) {
    return await deleteDoc(doc(db, "youtube", id));
  }
};

// --- BLOG SERVICE ---
export const blogService = {
  async getAll() {
    const q = query(collection(db, "blog"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  async getById(id: string) {
    const docRef = doc(db, "blog", id);
    const snapshot = await getDocs(query(collection(db, "blog"), where("__name__", "==", id)));
    if (snapshot.empty) return null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  },
  async add(article: any) {

    return await addDoc(collection(db, "blog"), { 
      ...article, 
      author: "Ankit Yadav",
      status: "published",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp() 
    });
  },
  async update(id: string, data: any) {
    const docRef = doc(db, "blog", id);
    return await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  },
  async delete(id: string) {
    return await deleteDoc(doc(db, "blog", id));
  }
};

// --- SUBSCRIBER SERVICE ---
export const subscriberService = {
  async getAll() {
    const q = query(collection(db, "subscribers"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  async add(email: string, name?: string) {
    return await addDoc(collection(db, "subscribers"), { 
      email, 
      name: name || "Subscriber", 
      source: "Website Footer",
      createdAt: serverTimestamp(),
      status: "Active"
    });
  },
  async delete(id: string) {
    return await deleteDoc(doc(db, "subscribers", id));
  }
};

// --- RESOURCE SERVICE ---
export const resourceService = {
  async getAll() {
    const q = query(collection(db, "resources"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  async add(resource: any) {
    return await addDoc(collection(db, "resources"), { 
      ...resource, 
      author: "Ankit Yadav",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      downloads: 0 
    });
  },
  async update(id: string, data: any) {
    const docRef = doc(db, "resources", id);
    return await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  },
  async delete(id: string) {
    return await deleteDoc(doc(db, "resources", id));
  }
};

// --- SETTINGS SERVICE ---
export const MASTER_SETTINGS_ID = "2Tqtvx310IJSrwMv08CF";


export const settingsService = {
  async get() {
    try {
      // 1. First attempt: Direct ID fetch
      const docRef = doc(db, "settings", MASTER_SETTINGS_ID);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists() && snapshot.data().heroHeadline) {
        return { id: snapshot.id, ...snapshot.data() };
      }

      // 2. Fallback: Discovery Search by Author/Headline
      const q = query(
        collection(db, "settings"), 
        where("heroHeadline", "==", "Ankit Yadav"),
        limit(1)
      );
      const searchSnapshot = await getDocs(q);
      if (!searchSnapshot.empty) {
        return { id: searchSnapshot.docs[0].id, ...searchSnapshot.docs[0].data() };
      }

      // 3. Last Resort: Get the most recently updated document
      const lastResortQ = query(collection(db, "settings"), orderBy("updatedAt", "desc"), limit(1));
      const lastResortSnapshot = await getDocs(lastResortQ);
      if (!lastResortSnapshot.empty) {
        return { id: lastResortSnapshot.docs[0].id, ...lastResortSnapshot.docs[0].data() };
      }

      return null;
    } catch (err) {
      console.error("Error fetching settings:", err);
      return null;
    }
  },

  async update(id: string, data: any) {
    // Always use the Master ID regardless of what is passed
    const docRef = doc(db, "settings", MASTER_SETTINGS_ID);
    return await setDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    }, { merge: true });
  },
  async create(data: any) {
    // We don't create new ones anymore, we always update the Master
    return await this.update(MASTER_SETTINGS_ID, data);
  }
};


