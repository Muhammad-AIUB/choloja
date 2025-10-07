// Seed 20 sample hotels - JavaScript version for easier env loading
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI not found in .env.local");
    process.exit(1);
}

// Use existing Accommodation schema (matching the TypeScript model)
const accommodationSchema = new mongoose.Schema({
    ownerId: { type: String, required: true },
    basicInfo: {
        name: { type: String, required: true },
        type: { type: String, enum: ["hotel", "resort", "pension", "motel", "glamping"], required: true },
        description: { type: String, required: true },
        starRating: { type: Number, min: 1, max: 5 },
    },
    location: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        zipCode: { type: String, required: true },
    },
    contact: {
        phone: { type: String, required: true },
        email: { type: String, required: true },
        website: String,
    },
    amenities: [String],
    policies: {
        checkInTime: String,
        checkOutTime: String,
        cancellationPolicy: String,
        childrenPolicy: String,
        petsPolicy: String,
        smokingPolicy: String,
    },
    images: {
        main: [String],
        gallery: [String],
    },
    rooms: [{
        id: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        type: { type: String, required: true },
        bedType: { type: String, required: true },
        size: { type: Number, required: true },
        capacity: {
            standard: { type: Number, required: true },
            max: { type: Number, required: true },
        },
        quantity: { type: Number, required: true },
        basePrice: { type: Number, required: true },
        images: [String],
        amenities: [String],
        availability: { type: Boolean, default: true },
    }],
    pricing: {
        currency: { type: String, default: "KRW" },
        taxRate: { type: Number, default: 10 },
        serviceFeeRate: { type: Number, default: 5 },
    },
    status: {
        type: String,
        enum: ["draft", "pending_review", "approved", "rejected"],
        default: "draft",
    },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
}, { timestamps: true });

const Accommodation = mongoose.models.Accommodation || mongoose.model('Accommodation', accommodationSchema);

const sampleHotels = [
    {
        ownerId: "demo-owner-1",
        basicInfo: {
            name: "Grand Seoul Luxury Hotel",
            type: "hotel",
            description: "Experience unparalleled luxury in the heart of Seoul's vibrant Gangnam district. Modern architecture with traditional Korean aesthetics.",
            starRating: 5,
        },
        location: {
            address: "123 Teheran-ro, Gangnam-gu",
            city: "Seoul",
            state: "Seoul",
            country: "South Korea",
            zipCode: "06234",
        },
        contact: { phone: "+82-2-1234-5678", email: "info@grandseoul.com", website: "https://grandseoul.com" },
        amenities: ["Free WiFi", "Swimming Pool", "Fitness Center", "Restaurant", "Spa", "Room Service", "Concierge"],
        policies: {
            checkInTime: "15:00",
            checkOutTime: "11:00",
            cancellationPolicy: "Free cancellation up to 3 days before check-in",
            childrenPolicy: "Children of all ages welcome",
            petsPolicy: "Pets not allowed",
            smokingPolicy: "Non-smoking property",
        },
        images: {
            main: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop"],
            gallery: [
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop",
            ],
        },
        rooms: [
            {
                id: "gsh-deluxe-double",
                name: "Deluxe Double Room",
                description: "Spacious 35㎡ room with stunning city views and premium amenities",
                type: "Deluxe",
                bedType: "1 King Bed",
                size: 35,
                capacity: { standard: 2, max: 3 },
                quantity: 15,
                basePrice: 280000,
                images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600"],
                amenities: ["Free WiFi", "TV", "Mini Bar", "Safe", "Bathtub", "City View"],
                availability: true,
            },
            {
                id: "gsh-executive-suite",
                name: "Executive Suite",
                description: "Luxurious 55㎡ suite with separate living area",
                type: "Suite",
                bedType: "1 King Bed",
                size: 55,
                capacity: { standard: 2, max: 4 },
                quantity: 8,
                basePrice: 450000,
                images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600"],
                amenities: ["Free WiFi", "TV", "Living Room", "Mini Bar", "Safe", "Bathtub", "Panoramic View"],
                availability: true,
            },
        ],
        pricing: { currency: "KRW", taxRate: 10, serviceFeeRate: 5 },
        status: "approved",
        averageRating: 4.8,
        totalReviews: 1547,
    },
    {
        ownerId: "demo-owner-2",
        basicInfo: {
            name: "Busan Haeundae Beach Resort",
            type: "resort",
            description: "Luxury beachfront resort with stunning ocean views, world-class spa, and multiple dining options.",
            starRating: 5,
        },
        location: {
            address: "264 Haeundaehaebyeon-ro, Haeundae-gu",
            city: "Busan",
            state: "Busan",
            country: "South Korea",
            zipCode: "48099",
        },
        contact: { phone: "+82-51-2345-6789", email: "info@busanresort.com", website: "https://busanresort.com" },
        amenities: ["Beach Access", "Outdoor Pool", "Spa & Wellness", "Multiple Restaurants", "Bar", "Kids Club", "Water Sports"],
        policies: {
            checkIn: "15:00",
            checkOut: "11:00",
            cancellationPolicy: "Free cancellation up to 5 days before check-in",
            childrenPolicy: "Children welcome, kids club available",
            petPolicy: "No pets allowed",
            smokingPolicy: "Designated smoking areas only",
        },
        images: {
            main: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&h=800&fit=crop"],
            gallery: [
                "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&h=800&fit=crop",
            ],
        },
        rooms: [
            {
                id: "bhr-ocean-view",
                name: "Ocean View Room",
                description: "Beautiful room with direct ocean views and private balcony",
                type: "Deluxe",
                bedType: "1 King Bed or 2 Single Beds",
                size: 40,
                capacity: { standard: 2, max: 3 },
                quantity: 25,
                basePrice: 320000,
                images: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600"],
                amenities: ["Ocean View", "Balcony", "Free WiFi", "Mini Bar", "Beach Access"],
                availability: true,
            },
            {
                id: "bhr-family-suite",
                name: "Family Suite",
                description: "Spacious suite perfect for families with connecting rooms",
                type: "Suite",
                bedType: "2 Queen Beds",
                size: 65,
                capacity: { standard: 4, max: 6 },
                quantity: 12,
                basePrice: 480000,
                images: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600"],
                amenities: ["Ocean View", "2 Bathrooms", "Living Area", "Kids Amenities", "Kitchenette"],
                availability: true,
            },
        ],
        pricing: { currency: "KRW", taxRate: 10, serviceFeeRate: 5 },
        status: "approved",
        averageRating: 4.9,
        totalReviews: 892,
    },
    {
        ownerId: "demo-owner-3",
        basicInfo: {
            name: "Jeju Island Paradise Pension",
            type: "pension",
            description: "Cozy pension with beautiful garden, mountain views, and traditional Korean atmosphere. Perfect for family getaways.",
            starRating: 4,
        },
        location: {
            address: "100 Seongsan-ro, Seongsan-eup",
            city: "Seogwipo",
            state: "Jeju",
            country: "South Korea",
            zipCode: "63639",
        },
        contact: { phone: "+82-64-3456-7890", email: "stay@jejuparadise.com", website: "https://jejuparadise.com" },
        amenities: ["Free WiFi", "Garden", "BBQ Facilities", "Free Parking", "Full Kitchen", "Mountain View"],
        policies: {
            checkIn: "16:00",
            checkOut: "11:00",
            cancellationPolicy: "Free cancellation up to 7 days before check-in",
            childrenPolicy: "Family friendly, playground available",
            petPolicy: "Small pets allowed with extra fee (₩20,000/night)",
            smokingPolicy: "Outdoor smoking only",
        },
        images: {
            main: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop"],
            gallery: [
                "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1200&h=800&fit=crop",
            ],
        },
        rooms: [
            {
                id: "jip-family-room",
                name: "Family Room with Kitchen",
                description: "Spacious room with full kitchen facilities and garden view",
                type: "Family",
                bedType: "2 Queen Beds",
                size: 45,
                capacity: { standard: 4, max: 6 },
                quantity: 6,
                basePrice: 180000,
                images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600"],
                amenities: ["Full Kitchen", "Garden View", "BBQ Access", "Free WiFi", "Washing Machine"],
                availability: true,
            },
        ],
        pricing: { currency: "KRW", taxRate: 10, serviceFeeRate: 5 },
        status: "approved",
        averageRating: 4.7,
        totalReviews: 456,
    },
    {
        ownerId: "demo-owner-4",
        basicInfo: {
            name: "Myeongdong Shopping District Hotel",
            type: "hotel",
            description: "Modern boutique hotel in the heart of Myeongdong. Walking distance to shopping, dining, and major attractions.",
            starRating: 4,
        },
        location: {
            address: "45 Myeongdong-gil, Jung-gu",
            city: "Seoul",
            state: "Seoul",
            country: "South Korea",
            zipCode: "04536",
        },
        contact: { phone: "+82-2-4567-8901", email: "hello@myeongdonghotel.com", website: "" },
        amenities: ["Free WiFi", "Restaurant", "24h Front Desk", "Luggage Storage", "Airport Shuttle"],
        policies: {
            checkIn: "14:00",
            checkOut: "12:00",
            cancellationPolicy: "Free cancellation up to 2 days before check-in",
            childrenPolicy: "Children welcome",
            petPolicy: "No pets allowed",
            smokingPolicy: "Non-smoking property",
        },
        images: {
            main: ["https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&h=800&fit=crop"],
            gallery: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop"],
        },
        rooms: [
            {
                id: "mdh-standard-twin",
                name: "Standard Twin Room",
                description: "Comfortable twin room perfect for friends or colleagues",
                type: "Standard",
                bedType: "2 Single Beds",
                size: 25,
                capacity: { standard: 2, max: 2 },
                quantity: 20,
                basePrice: 120000,
                images: ["https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600"],
                amenities: ["Free WiFi", "TV", "Air Conditioning", "Mini Fridge"],
                availability: true,
            },
        ],
        pricing: { currency: "KRW", taxRate: 10, serviceFeeRate: 5 },
        status: "approved",
        averageRating: 4.5,
        totalReviews: 789,
    },
    {
        ownerId: "demo-owner-5",
        basicInfo: {
            name: "Incheon Airport Transit Hotel",
            type: "hotel",
            description: "Convenient capsule-style hotel inside Incheon International Airport. Perfect for layovers and early morning flights.",
            starRating: 4,
        },
        location: {
            address: "Incheon International Airport, Terminal 1, Airside",
            city: "Incheon",
            state: "Incheon",
            country: "South Korea",
            zipCode: "22382",
        },
        contact: { phone: "+82-32-5678-9012", email: "stay@airporthotel.com", website: "" },
        amenities: ["Free WiFi", "24/7 Check-in", "Soundproof Rooms", "Shower Facilities", "Airport Location"],
        policies: {
            checkIn: "24/7 available",
            checkOut: "Flexible",
            cancellationPolicy: "Free cancellation up to 1 day before",
            childrenPolicy: "All ages welcome",
            petPolicy: "No pets allowed",
            smokingPolicy: "Non-smoking property",
        },
        images: {
            main: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&h=800&fit=crop"],
            gallery: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop"],
        },
        rooms: [
            {
                id: "iah-capsule",
                name: "Transit Capsule Room",
                description: "Compact soundproof capsule for quick rest between flights",
                type: "Capsule",
                bedType: "1 Single Bed",
                size: 12,
                capacity: { standard: 1, max: 1 },
                quantity: 40,
                basePrice: 60000,
                images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600"],
                amenities: ["Soundproof", "Free WiFi", "Reading Light", "USB Charging"],
                availability: true,
            },
        ],
        pricing: { currency: "KRW", taxRate: 10, serviceFeeRate: 5 },
        status: "approved",
        averageRating: 4.6,
        totalReviews: 1234,
    },
];

// Generate 15 more diverse hotels
const cities = [
    { name: "Seoul", state: "Seoul" },
    { name: "Busan", state: "Busan" },
    { name: "Incheon", state: "Incheon" },
    { name: "Daegu", state: "Daegu" },
    { name: "Daejeon", state: "Daejeon" },
    { name: "Gwangju", state: "Gwangju" },
    { name: "Ulsan", state: "Ulsan" },
    { name: "Suwon", state: "Gyeonggi" },
    { name: "Jeonju", state: "Jeollabuk" },
    { name: "Gyeongju", state: "Gyeongsangbuk" },
];

const hotelTemplates = [
    { prefix: "Sky Tower", type: "hotel", amenities: ["Rooftop Bar", "Gym", "Restaurant"], rating: 4.7 },
    { prefix: "Ocean Breeze", type: "resort", amenities: ["Beach", "Pool", "Spa"], rating: 4.8 },
    { prefix: "Mountain View", type: "pension", amenities: ["Hiking", "BBQ", "Garden"], rating: 4.5 },
    { prefix: "City Lights", type: "hotel", amenities: ["Business Center", "Gym", "Cafe"], rating: 4.6 },
    { prefix: "Harbor Inn", type: "motel", amenities: ["Parking", "WiFi", "Breakfast"], rating: 4.3 },
    { prefix: "Riverside Palace", type: "hotel", amenities: ["River View", "Restaurant", "Spa"], rating: 4.9 },
    { prefix: "Sunset Villa", type: "pension", amenities: ["Garden", "Pool", "Kitchen"], rating: 4.4 },
    { prefix: "Downtown Plaza", type: "hotel", amenities: ["Conference Room", "Restaurant", "Gym"], rating: 4.7 },
    { prefix: "Garden Court", type: "pension", amenities: ["Garden", "BBQ", "Playground"], rating: 4.5 },
    { prefix: "Royal Palace", type: "hotel", amenities: ["Spa", "Fine Dining", "Concierge"], rating: 4.8 },
    { prefix: "Lakeside Resort", type: "resort", amenities: ["Lake View", "Water Sports", "Spa"], rating: 4.7 },
    { prefix: "Business Tower", type: "hotel", amenities: ["Meeting Rooms", "Gym", "Lounge"], rating: 4.6 },
    { prefix: "Comfort Inn", type: "motel", amenities: ["Free Parking", "WiFi", "Vending"], rating: 4.2 },
    { prefix: "Premium Stay", type: "hotel", amenities: ["Pool", "Spa", "Restaurant"], rating: 4.7 },
    { prefix: "Elite Boutique", type: "hotel", amenities: ["Art Gallery", "Wine Bar", "Spa"], rating: 4.9 },
];

hotelTemplates.forEach((template, i) => {
    const city = cities[i % cities.length];
    const hotelName = `${template.prefix} ${city.name}`;
    const basePrice = 90000 + (i * 15000);
    
    sampleHotels.push({
        ownerId: `demo-owner-${i + 6}`,
        basicInfo: {
            name: hotelName,
            type: template.type,
            description: `Modern ${template.type} in ${city.name} featuring excellent facilities and top-notch service. Ideal for both business and leisure travelers seeking comfort and convenience.`,
            starRating: Math.floor(template.rating),
        },
        location: {
            address: `${100 + i * 10} Main Boulevard`,
            city: city.name,
            state: city.state,
            country: "South Korea",
            zipCode: `${10000 + i * 100}`,
        },
        contact: {
            phone: `+82-${10 + (i % 90)}-${1000 + i}-0000`,
            email: `info@${hotelName.toLowerCase().replace(/ /g, "")}.com`,
            website: "",
        },
        amenities: ["Free WiFi", "Parking", ...template.amenities, "24h Reception"],
        policies: {
            checkIn: "15:00",
            checkOut: "11:00",
            cancellationPolicy: "Free cancellation up to 3 days before check-in",
            childrenPolicy: "Children welcome",
            petPolicy: i % 3 === 0 ? "Small pets allowed with fee" : "No pets allowed",
            smokingPolicy: "Non-smoking rooms available",
        },
        images: {
            main: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop"],
            gallery: [
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&h=800&fit=crop",
            ],
        },
        rooms: [
            {
                id: `${hotelName.toLowerCase().replace(/ /g, "-")}-standard`,
                name: "Standard Room",
                description: "Comfortable room with modern amenities and city views",
                type: "Standard",
                bedType: i % 2 === 0 ? "1 Queen Bed" : "2 Single Beds",
                size: 28 + (i % 5) * 2,
                capacity: { standard: 2, max: 3 },
                quantity: 15 + (i % 3) * 5,
                basePrice: basePrice,
                images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600"],
                amenities: ["Free WiFi", "TV", "Air Conditioning", "Mini Fridge"],
                availability: true,
            },
            {
                id: `${hotelName.toLowerCase().replace(/ /g, "-")}-deluxe`,
                name: "Deluxe Suite",
                description: "Spacious suite with separate living area and premium amenities",
                type: "Deluxe",
                bedType: "1 King Bed",
                size: 42 + (i % 4) * 3,
                capacity: { standard: 2, max: 4 },
                quantity: 8 + (i % 2) * 2,
                basePrice: basePrice + 80000,
                images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600"],
                amenities: ["Free WiFi", "TV", "City View", "Bathtub", "Mini Bar", "Safe", "Work Desk"],
                availability: true,
            },
        ],
        pricing: { currency: "KRW", taxRate: 10, serviceFeeRate: 5 },
        status: "approved",
        averageRating: template.rating,
        totalReviews: 150 + i * 45,
    });
});

async function seed() {
    try {
        console.log("🔄 Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI);
        console.log("✅ Connected to MongoDB Atlas");

        // Clear existing demo data
        const deleteResult = await Accommodation.deleteMany({ ownerId: /^demo-owner-/ });
        console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing demo hotels`);

        // Insert new hotels
        const result = await Accommodation.insertMany(sampleHotels);
        console.log(`✅ Successfully seeded ${result.length} sample hotels!`);
        
        console.log("\n📊 Hotel breakdown:");
        console.log(`   - Total: ${sampleHotels.length} hotels`);
        console.log(`   - Cities covered: Seoul, Busan, Jeju, Incheon, and more`);
        console.log(`   - Types: Hotels, Resorts, Pensions, Motels`);
        console.log(`   - All with multiple room types and amenities`);
        console.log("\n🎉 Demo data ready! Your client can now test the full booking flow.\n");

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
}

seed();

