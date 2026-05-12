import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, "db.json");

// Initial DB structure
const initialDB = {
  products: [
    {
      id: "1",
      name: "L'Aurore",
      price: 120000,
      category: "MARIAGE",
      image: "/photo 3.jpg",
      description: "Un bouquet élégant pour un jour inoubliable."
    },
    {
      id: "2",
      name: "Minuit à Paris",
      price: 155000,
      category: "ANNIVERSAIRE",
      image: "/photo 6.jpg",
      description: "Une composition mystérieuse et sophistiquée."
    },
    {
      id: "3",
      name: "Rêve Blanc",
      price: 105000,
      category: "MARIAGE",
      image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800",
      description: "Pureté et grâce dans ce bouquet de fleurs blanches."
    },
    {
      id: "4",
      name: "Éclat Royal",
      price: 210000,
      category: "DÉCORATION",
      image: "https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?auto=format&fit=crop&q=80&w=800",
      description: "Une pièce maîtresse luxueuse pour votre intérieur."
    },
    {
      id: "5",
      name: "Amour Éternel",
      price: 125000,
      category: "SAINT-VALENTIN",
      image: "/photo .9jpg.jpg",
      description: "Le symbole ultime de la passion."
    },
    {
      id: "6",
      name: "Premier Sourire",
      price: 95000,
      category: "NAISSANCE",
      image: "https://images.unsplash.com/photo-1591873386927-ddf4b45a5c1d?auto=format&fit=crop&q=80&w=800",
      description: "Douceur et tendresse pour célébrer une nouvelle vie."
    },
    {
      id: "7",
      name: "Hommage Paisible",
      price: 135000,
      category: "DEUIL",
      image: "/photo 2.jpg",
      description: "Une présence réconfortante et respectueuse."
    },
    {
      id: "8",
      name: "Jardin Intérieur",
      price: 185000,
      category: "DÉCORATION",
      image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=800",
      description: "Apportez la fraîcheur du jardin dans votre maison."
    },
    {
      id: "orn-1",
      name: "Vase en Cristal d'Arques",
      price: 125000,
      category: "ORNEMENTS",
      image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=800",
      description: "Un vase d'exception pour sublimer vos compositions les plus prestigieuses."
    }
  ],
  services: [
    {
      id: "deco",
      title: "Décoration & Design Intérieur",
      category: "Intérieur",
      description: "Sublimez vos espaces de vie avec nos créations florales permanentes ou éphémères.",
      items: ["Aménagement paysager", "Design floral résidentiel", "Signalétique végétale"],
      image: "https://images.unsplash.com/photo-1533907650686-70576141c030?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "mortuaire",
      title: "Décoration Mortuaire",
      category: "Cérémonie",
      description: "Un hommage d'une infinie douceur pour accompagner vos proches avec dignité.",
      items: ["Coussins deuil", "Cœurs floraux", "Dessus de cercueil"],
      image: "/photo 2.jpg"
    },
    {
      id: "africaine",
      title: "Décoration Africaine",
      category: "Culture",
      description: "L'art floral revisité à travers les richesses et les couleurs du continent africain.",
      items: ["Compositions exotiques", "Éléments naturels sculptés", "Tissages floraux"],
      image: "https://images.unsplash.com/photo-1508778643884-250811e5a7b6?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "art",
      title: "Art Floral & Confection",
      category: "Sur Mesure",
      description: "L'expression de notre savoir-faire dans chaque tige sélectionnée avec soin.",
      items: ["Bouquets personnalisés", "Fleurs séchées", "Atelier de séchage"],
      image: "/photo 1.jpg"
    },
    {
      id: "logistique",
      title: "Logistique & Location",
      category: "Événementiel",
      description: "Les structures essentielles pour vos réceptions de prestige.",
      items: ["Location de bâches", "Mobilier événementiel", "Accessoires de réception"],
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800"
    }
  ],
  collections: [
    {
      id: "1",
      title: "Le Mariage",
      subtitle: "Couture Nuptiale",
      description: "Une célébration de l'amour à travers des compositions aériennes et romantiques. Nos fleurs nuptiales sont sélectionnées pour leur symbolisme et leur beauté éphémère.",
      image: "/photo 3.jpg",
    },
    {
      id: "2",
      title: "Anniversaire",
      subtitle: "L'Art de Célébrer",
      description: "Marquez le passage du temps avec audace. Des bouquets vibrants et généreux conçus pour illuminer ces instants de joie partagée.",
      image: "/photo 6.jpg",
    },
    {
      id: "3",
      title: "Saint-Valentin",
      subtitle: "Passion Florale",
      description: "L'expression ultime des sentiments. Des collections passionnées où la rose est reine, sublimée par des textures veloutées et des parfums envoûtants.",
      image: "/photo .9jpg.jpg",
    },
    {
      id: "4",
      title: "Naissance",
      subtitle: "Douce Éclosion",
      description: "Des teintes tendres et des textures délicates pour célébrer une nouvelle vie. Une ode à la pureté et à l'innocence du renouveau.",
      image: "https://images.unsplash.com/photo-1591873386927-ddf4b45a5c1d?auto=format&fit=crop&q=80&w=1200",
    },
    {
      id: "5",
      title: "Deuil",
      subtitle: "Hommage Paisible",
      description: "La grâce et la sérénité pour accompagner les derniers adieux. Des compositions dignes qui expriment ce que les mots ne peuvent dire.",
      image: "/photo 2.jpg",
    },
    {
      id: "6",
      title: "Réception",
      subtitle: "Design Prestige",
      description: "Scénographies florales pour vos événements d'exception. Nous transformons vos espaces en jardins éphémères d'une élégance absolue.",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1200",
    },
  ],
  formations: [
    {
      id: "1",
      title: "Art du Bouquet Rond",
      description: "Maîtrisez la technique de la spirale pour des bouquets parfaits.",
      price: 75000,
      image: "https://images.unsplash.com/photo-1591873386927-ddf4b45a5c1d?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "2",
      title: "Design Événementiel",
      description: "Apprenez à concevoir des décors floraux pour les grandes réceptions.",
      price: 150000,
      image: "https://images.unsplash.com/photo-1533907650686-70576141c030?auto=format&fit=crop&q=80&w=800"
    }
  ],
  reviews: [
    {
      id: "1",
      customerName: "Marie N.",
      rating: 5,
      comment: "Des bouquets d'une élégance rare. La livraison à Douala a été impeccable.",
      date: "2024-03-15"
    },
    {
      id: "2",
      customerName: "Jean-Pierre E.",
      rating: 5,
      comment: "Le service atelier sur mesure est incroyable. On sent la passion des artisans.",
      date: "2024-03-20"
    },
    {
      id: "3",
      customerName: "Sophie T.",
      rating: 4,
      comment: "Magnifique décoration pour mon mariage. Merci à toute l'équipe.",
      date: "2024-04-02"
    }
  ],
  bouquetConfig: {
    pricingType: "fixed",
    price: 137000,
    steps: [
      { id: 1, name: "Palette", options: [{ name: "Pastels Doux", price: 0 }, { name: "Blanc Monochromatique", price: 0 }, { name: "Coucher de Soleil Vibrant", price: 15000 }, { name: "Vert Forêt Profond", price: 10000 }] },
      { id: 2, name: "Profil Olfactif", options: [{ name: "Agrumes & Frais", price: 0 }, { name: "Chaud & Musqué", price: 5000 }, { name: "Rose Classique", price: 8000 }, { name: "Fleurs Sauvages", price: 0 }] },
      { id: 3, name: "Occasion", options: [{ name: "Cadeau Romantique", price: 0 }, { name: "Cérémonie Solennelle", price: 0 }, { name: "Gala d'Entreprise", price: 0 }, { name: "Soirée Intime", price: 0 }] },
    ]
  },
  quotes: [],
  admin: {
    username: "admin",
    password: "password123" // In a real app, use hashing!
  }
};

async function readDB() {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    const db = JSON.parse(data);
    // Ensure all initial keys exist
    let changed = false;
    for (const key in initialDB) {
      if (!(key in db)) {
        db[key] = (initialDB as any)[key];
        changed = true;
      }
    }
    if (changed) await writeDB(db);
    return db;
  } catch (error) {
    await fs.writeFile(DB_PATH, JSON.stringify(initialDB, null, 2));
    return initialDB;
  }
}

async function writeDB(data: any) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));

  // API Routes
  app.post("/api/admin/login", async (req, res) => {
    const { username, password } = req.body;
    const db = await readDB();
    if (db.admin && username === db.admin.username && password === db.admin.password) {
      res.json({ success: true, token: "mock-token-" + Date.now() });
    } else {
      res.status(401).json({ success: false, message: "Identifiants invalides" });
    }
  });

  app.post("/api/admin/register", async (req, res) => {
    const { username, password } = req.body;
    const db = await readDB();
    // Simple registration (only for the first user for now or multiple if we use an array)
    db.admin = { username, password };
    await writeDB(db);
    res.json({ success: true });
  });

  // Products
  app.get("/api/products", async (req, res) => {
    const db = await readDB();
    res.json(db.products);
  });

  app.post("/api/products", async (req, res) => {
    const db = await readDB();
    const newProduct = { ...req.body, id: Date.now().toString() };
    db.products.push(newProduct);
    await writeDB(db);
    res.json(newProduct);
  });

  app.put("/api/products/:id", async (req, res) => {
    const db = await readDB();
    const index = db.products.findIndex((p: any) => p.id === req.params.id);
    if (index !== -1) {
      db.products[index] = { ...db.products[index], ...req.body };
      await writeDB(db);
      res.json(db.products[index]);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    const db = await readDB();
    db.products = db.products.filter((p: any) => p.id !== req.params.id);
    await writeDB(db);
    res.json({ success: true });
  });

  // Similarly for Services, Collections, Formations
  const entities = ["services", "collections", "formations", "quotes", "reviews"];
  entities.forEach(entity => {
    app.get(`/api/${entity}`, async (req, res) => {
      const db = await readDB();
      res.json(db[entity] || []);
    });

    app.post(`/api/${entity}`, async (req, res) => {
      const db = await readDB();
      const newItem = { ...req.body, id: Date.now().toString() };
      db[entity].push(newItem);
      await writeDB(db);
      res.json(newItem);
    });

    app.put(`/api/${entity}/:id`, async (req, res) => {
      const db = await readDB();
      const index = db[entity].findIndex((p: any) => p.id === req.params.id);
      if (index !== -1) {
        db[entity][index] = { ...db[entity][index], ...req.body };
        await writeDB(db);
        res.json(db[entity][index]);
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    });

    app.delete(`/api/${entity}/:id`, async (req, res) => {
      const db = await readDB();
      db[entity] = db[entity].filter((p: any) => p.id !== req.params.id);
      await writeDB(db);
      res.json({ success: true });
    });
  });

  // Bouquet Config
  app.get("/api/bouquet-config", async (req, res) => {
    const db = await readDB();
    res.json(db.bouquetConfig || initialDB.bouquetConfig);
  });

  app.put("/api/bouquet-config", async (req, res) => {
    const db = await readDB();
    db.bouquetConfig = req.body;
    await writeDB(db);
    res.json(db.bouquetConfig);
  });

  // Bulk Deletion
  app.delete("/api/admin/clear/:entity", async (req, res) => {
    const { entity } = req.params;
    const db = await readDB();
    if (db[entity] && Array.isArray(db[entity])) {
      db[entity] = [];
      await writeDB(db);
      res.json({ success: true, message: `All items in ${entity} cleared` });
    } else {
      res.status(400).json({ success: false, message: "Invalid entity" });
    }
  });

  app.delete("/api/admin/clear-all", async (req, res) => {
    const db = await readDB();
    entities.forEach(entity => {
      if (Array.isArray(db[entity])) {
        db[entity] = [];
      }
    });
    // Optional: also clear products? Usually "clear all" statistical data might mean quotes/customers.
    // But "données statistiques" in a full sweep usually means everything except admin.
    db.products = [];
    await writeDB(db);
    res.json({ success: true, message: "All data cleared" });
  });

  // Customers (derived from quotes)
  app.get("/api/customers", async (req, res) => {
    const db = await readDB();
    const customersMap = new Map();
    db.quotes.forEach((q: any) => {
      if (q.customerEmail) {
        customersMap.set(q.customerEmail, {
          email: q.customerEmail,
          name: q.customerName,
          phone: q.customerPhone,
          lastQuoteDate: q.date
        });
      }
    });
    res.json(Array.from(customersMap.values()));
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
