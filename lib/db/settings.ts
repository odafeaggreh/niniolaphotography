import { getAdminDb } from "../firebase-admin";

export interface SiteSettings {
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  socials: {
    instagram: string;
    twitter: string;
    facebook: string;
    linkedin: string;
  };
  stats: {
    yearsOfExperience: string;
    clientsServed: string;
    photosTaken: string;
  };
}

const SETTINGS_DOC_ID = "general";
const SETTINGS_COLLECTION = "settings";

export async function getSettings(): Promise<SiteSettings> {
  try {
    const db = getAdminDb();
    const docRef = db.collection(SETTINGS_COLLECTION).doc(SETTINGS_DOC_ID);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      return docSnap.data() as SiteSettings;
    }

    // Default settings if none exist
    return {
      contact: {
        email: "hello@niniola.com",
        phone: "+234 800 000 0000",
        address: "Lagos, Nigeria",
      },
      socials: {
        instagram: "#",
        twitter: "#",
        facebook: "#",
        linkedin: "#",
      },
      stats: {
        yearsOfExperience: "16+",
        clientsServed: "386+",
        photosTaken: "806+",
      },
    };
  } catch (error) {
    console.error("Error getting settings:", error);
    throw error;
  }
}

export async function updateSettings(settings: SiteSettings): Promise<void> {
  try {
    const db = getAdminDb();
    const docRef = db.collection(SETTINGS_COLLECTION).doc(SETTINGS_DOC_ID);
    await docRef.set(settings, { merge: true });
  } catch (error) {
    console.error("Error updating settings:", error);
    throw error;
  }
}
