import { useEffect, useState } from "react";
import { AccommodationDetail } from "@/types";
import { AccommodationEntity } from "@/lib/domain/entities/Accommodation.entity";

// Helper to convert API entity to frontend type
function convertToAccommodationDetail(entity: AccommodationEntity): AccommodationDetail {
    return {
        id: entity.id,
        title: entity.basicInfo.name,
        location: `${entity.location.city}, ${entity.location.state}`,
        address: entity.location.address,
        rating: entity.averageRating,
        reviewCount: entity.totalReviews,
        description: entity.basicInfo.description,
        images: [...entity.images.main, ...entity.images.gallery],
        priceRange: `₩${Math.min(...entity.rooms.map(r => r.basePrice)).toLocaleString()} - ₩${Math.max(...entity.rooms.map(r => r.basePrice)).toLocaleString()}`,
        checkInTime: entity.policies.checkInTime || "15:00",
        checkOutTime: entity.policies.checkOutTime || "11:00",
        badges: entity.basicInfo.starRating ? [`${entity.basicInfo.starRating} Star`] : [],
        amenities: entity.amenities.map(name => ({ id: name, name, icon: "Check", category: "basic" })),
        rooms: entity.rooms.map(room => ({
            id: room.id,
            name: room.name,
            description: room.description,
            images: room.images.length > 0 ? room.images : entity.images.main,
            capacity: room.capacity,
            bedType: room.bedType,
            size: room.size,
            price: `₩${room.basePrice.toLocaleString()}`,
            checkInTime: entity.policies.checkInTime || "15:00",
            checkOutTime: entity.policies.checkOutTime || "11:00",
            amenities: room.amenities,
            availability: room.availability ? "available" : "soldout",
            remainingRooms: room.quantity,
            cancellationPolicy: entity.policies.cancellationPolicy || "Standard cancellation policy applies",
        })),
        reviews: [],
        aiReviewSummary: `${entity.basicInfo.name} is rated ${entity.averageRating.toFixed(1)} stars with ${entity.totalReviews} reviews.`,
        policies: {
            cancellation: entity.policies.cancellationPolicy || "Standard policy",
            children: entity.policies.childrenPolicy || "Children allowed",
            pets: entity.policies.petsPolicy || "Contact property",
            smoking: entity.policies.smokingPolicy || "Non-smoking",
        },
        nearbyAttractions: [],
    };
}

// Legacy mock accommodation data for backward compatibility
const mockAccommodations: { [key: string]: AccommodationDetail } = {
    "1": {
        id: "1",
        title: "서울 스카이라인 호텔",
        location: "서울 강남구",
        address: "서울특별시 강남구 테헤란로 123",
        rating: 4.8,
        reviewCount: 342,
        description:
            "강남의 중심에 위치한 프리미엄 비즈니스 호텔입니다. 최신 시설과 편안한 객실, 그리고 탁월한 서비스를 제공합니다.",
        images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
            "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=800",
        ],
        priceRange: "₩80,000 - ₩250,000",
        checkInTime: "15:00",
        checkOutTime: "11:00",
        badges: ["베스트셀러", "프리미엄", "비즈니스"],
        amenities: [
            { id: "1", name: "무료 WiFi", icon: "Wifi", category: "basic" },
            { id: "2", name: "주차 가능", icon: "Car", category: "basic" },
            { id: "3", name: "수영장", icon: "Waves", category: "facility" },
            {
                id: "4",
                name: "피트니스",
                icon: "Dumbbell",
                category: "facility",
            },
            {
                id: "5",
                name: "레스토랑",
                icon: "Utensils",
                category: "facility",
            },
            { id: "6", name: "룸서비스", icon: "Bell", category: "service" },
            { id: "7", name: "컨시어지", icon: "User", category: "service" },
            { id: "8", name: "조식 포함", icon: "Coffee", category: "service" },
        ],
        rooms: [
            {
                id: "room1",
                name: "디럭스 더블룸",
                description:
                    "넓고 편안한 객실로 비즈니스 및 레저 여행객에게 완벽합니다.",
                images: [
                    "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600",
                    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600",
                ],
                capacity: { standard: 2, max: 3 },
                bedType: "더블 베드 1개",
                size: 28,
                price: "₩120,000",
                originalPrice: "₩150,000",
                discount: "20% 할인",
                checkInTime: "15:00",
                checkOutTime: "11:00",
                amenities: ["무료 WiFi", "에어컨", "미니바", "TV", "욕조"],
                availability: "available",
                cancellationPolicy: "체크인 3일 전까지 무료 취소 가능",
            },
            {
                id: "room2",
                name: "프리미엄 트윈룸",
                description:
                    "도심 전망을 감상할 수 있는 고급스러운 객실입니다.",
                images: [
                    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600",
                    "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=600",
                ],
                capacity: { standard: 2, max: 4 },
                bedType: "싱글 베드 2개",
                size: 32,
                price: "₩98,000",
                originalPrice: "₩140,000",
                discount: "30% 할인",
                checkInTime: "15:00",
                checkOutTime: "11:00",
                amenities: [
                    "무료 WiFi",
                    "시티뷰",
                    "에어컨",
                    "미니바",
                    "TV",
                    "욕조",
                    "발코니",
                ],
                availability: "limited",
                remainingRooms: 2,
                cancellationPolicy: "체크인 5일 전까지 무료 취소 가능",
                packages: [
                    {
                        id: "pkg1",
                        name: "조식 포함 패키지",
                        description: "2인 뷔페 조식 포함",
                        price: "₩120,000",
                        originalPrice: "₩160,000",
                        discount: "25% 할인",
                        benefits: ["조식 2인", "레이트 체크아웃 12:00"],
                    },
                ],
            },
            {
                id: "room3",
                name: "패밀리 스위트",
                description: "가족 여행객을 위한 넓은 스위트룸입니다.",
                images: [
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600",
                ],
                capacity: { standard: 4, max: 6 },
                bedType: "퀸 베드 2개",
                size: 52,
                price: "₩180,000",
                originalPrice: "₩220,000",
                discount: "18% 할인",
                checkInTime: "15:00",
                checkOutTime: "11:00",
                amenities: [
                    "무료 WiFi",
                    "거실 공간",
                    "주방",
                    "세탁기",
                    "에어컨",
                    "욕조 2개",
                    "TV 2대",
                ],
                availability: "available",
                cancellationPolicy: "체크인 7일 전까지 무료 취소 가능",
            },
        ],
        reviews: [
            {
                id: "rev1",
                author: "김민수",
                rating: 5,
                date: "2024-01-15",
                comment:
                    "위치가 정말 좋고 직원분들이 친절합니다. 객실도 깨끗하고 편안했어요. 다음에 또 방문하고 싶습니다!",
                helpful: 12,
            },
            {
                id: "rev2",
                author: "박지은",
                rating: 4,
                date: "2024-01-10",
                comment:
                    "전반적으로 만족스러웠습니다. 조식이 맛있고 시설이 최신이에요. 주차가 조금 불편했지만 괜찮았습니다.",
                helpful: 8,
            },
            {
                id: "rev3",
                author: "이승호",
                rating: 5,
                date: "2024-01-05",
                comment:
                    "비즈니스 출장으로 방문했는데 완벽했습니다. 회의실 시설도 좋고 위치도 최고입니다.",
                helpful: 15,
            },
        ],
        aiReviewSummary:
            "이 숙소는 훌륭한 위치와 친절한 서비스로 높은 평가를 받고 있습니다. 대부분의 투숙객들이 깨끗한 객실, 맛있는 조식, 그리고 최신 시설에 만족했습니다. 비즈니스 여행객들에게 특히 인기가 많습니다.",
        policies: {
            cancellation: "체크인 3일 전까지 무료 취소 가능",
            children: "모든 연령의 아동 투숙 가능",
            pets: "반려동물 동반 불가",
            smoking: "전 객실 금연",
        },
        nearbyAttractions: [
            "강남역 - 도보 5분",
            "코엑스 - 차량 10분",
            "봉은사 - 차량 15분",
        ],
    },
    "2": {
        id: "2",
        title: "제주 오션뷰 펜션",
        location: "제주 서귀포시",
        address: "제주특별자치도 서귀포시 성산읍 해맞이해안로 100",
        rating: 4.9,
        reviewCount: 186,
        description:
            "바다가 한눈에 보이는 럭셔리 펜션입니다. 프라이빗한 공간에서 편안한 휴식을 즐기세요.",
        images: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
            "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800",
            "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800",
            "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
            "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=800",
        ],
        priceRange: "₩150,000 - ₩350,000",
        checkInTime: "16:00",
        checkOutTime: "11:00",
        badges: ["오션뷰", "프라이빗", "반려동물"],
        amenities: [
            { id: "1", name: "무료 WiFi", icon: "Wifi", category: "basic" },
            { id: "2", name: "무료 주차", icon: "Car", category: "basic" },
            {
                id: "3",
                name: "바비큐 시설",
                icon: "Utensils",
                category: "facility",
            },
            {
                id: "4",
                name: "야외 수영장",
                icon: "Waves",
                category: "facility",
            },
            { id: "5", name: "테라스", icon: "Waves", category: "facility" },
            {
                id: "6",
                name: "반려동물 동반",
                icon: "User",
                category: "service",
            },
        ],
        rooms: [
            {
                id: "room1",
                name: "오션뷰 디럭스",
                description:
                    "탁 트인 바다 전망과 함께하는 프리미엄 객실입니다.",
                images: [
                    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600",
                    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600",
                ],
                capacity: { standard: 4, max: 6 },
                bedType: "퀸 베드 2개",
                size: 45,
                price: "₩280,000",
                originalPrice: "₩350,000",
                discount: "20% 할인",
                checkInTime: "16:00",
                checkOutTime: "11:00",
                amenities: [
                    "무료 WiFi",
                    "오션뷰",
                    "주방",
                    "세탁기",
                    "에어컨",
                    "바비큐",
                    "테라스",
                ],
                availability: "available",
                cancellationPolicy: "체크인 7일 전까지 무료 취소 가능",
            },
            {
                id: "room2",
                name: "프라이빗 풀빌라",
                description: "전용 수영장이 있는 독립형 빌라입니다.",
                images: [
                    "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600",
                ],
                capacity: { standard: 2, max: 4 },
                bedType: "킹 베드 1개",
                size: 65,
                price: "₩320,000",
                checkInTime: "16:00",
                checkOutTime: "11:00",
                amenities: [
                    "무료 WiFi",
                    "프라이빗 풀",
                    "주방",
                    "세탁기",
                    "바비큐",
                    "야외 샤워",
                    "스파",
                ],
                availability: "limited",
                remainingRooms: 1,
                cancellationPolicy: "체크인 10일 전까지 무료 취소 가능",
            },
        ],
        reviews: [
            {
                id: "rev1",
                author: "최수진",
                rating: 5,
                date: "2024-01-20",
                comment:
                    "뷰가 정말 환상적이에요! 조용하고 깨끗해서 힐링하기 최고였습니다. 수영장도 깨끗하고 좋았어요.",
                helpful: 24,
            },
            {
                id: "rev2",
                author: "정민호",
                rating: 5,
                date: "2024-01-18",
                comment:
                    "가족 여행으로 다녀왔는데 아이들이 너무 좋아했어요. 사장님도 친절하시고 시설 최고입니다!",
                helpful: 18,
            },
        ],
        aiReviewSummary:
            "탁월한 오션뷰와 프라이빗한 공간으로 매우 높은 만족도를 보이고 있습니다. 특히 가족 단위 여행객들에게 인기가 많으며, 깨끗한 시설과 친절한 서비스가 돋보입니다.",
        policies: {
            cancellation: "체크인 7일 전까지 무료 취소 가능",
            children: "모든 연령의 아동 투숙 가능",
            pets: "반려동물 동반 가능 (추가 요금)",
            smoking: "야외에서만 흡연 가능",
        },
    },
    "3": {
        id: "3",
        title: "부산 해운대 리조트",
        location: "부산 해운대구",
        address: "부산광역시 해운대구 해운대해변로 264",
        rating: 4.7,
        reviewCount: 521,
        description:
            "해운대 해변이 바로 앞에 있는 특급 리조트입니다. 다양한 부대시설과 편의시설을 갖추고 있습니다.",
        images: [
            "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
            "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
        ],
        priceRange: "₩95,000 - ₩280,000",
        checkInTime: "15:00",
        checkOutTime: "11:00",
        badges: ["해변 인접", "리조트", "패밀리"],
        amenities: [
            { id: "1", name: "무료 WiFi", icon: "Wifi", category: "basic" },
            { id: "2", name: "발레파킹", icon: "Car", category: "basic" },
            {
                id: "3",
                name: "실내 수영장",
                icon: "Waves",
                category: "facility",
            },
            {
                id: "4",
                name: "피트니스 센터",
                icon: "Dumbbell",
                category: "facility",
            },
            {
                id: "5",
                name: "레스토랑",
                icon: "Utensils",
                category: "facility",
            },
            { id: "6", name: "키즈클럽", icon: "User", category: "service" },
            { id: "7", name: "스파", icon: "Waves", category: "facility" },
            { id: "8", name: "해변 접근", icon: "Waves", category: "facility" },
        ],
        rooms: [
            {
                id: "room1",
                name: "오션뷰 스탠다드",
                description:
                    "해운대 바다를 조망할 수 있는 스탠다드 객실입니다.",
                images: [
                    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600",
                ],
                capacity: { standard: 2, max: 3 },
                bedType: "더블 베드 1개",
                size: 32,
                price: "₩95,000",
                originalPrice: "₩130,000",
                discount: "27% 할인",
                checkInTime: "15:00",
                checkOutTime: "11:00",
                amenities: [
                    "무료 WiFi",
                    "오션뷰",
                    "에어컨",
                    "미니바",
                    "TV",
                    "욕조",
                ],
                availability: "available",
                cancellationPolicy: "체크인 3일 전까지 무료 취소 가능",
            },
            {
                id: "room2",
                name: "패밀리 스위트",
                description: "가족 단위 여행객을 위한 넓은 스위트 객실입니다.",
                images: [
                    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600",
                ],
                capacity: { standard: 4, max: 5 },
                bedType: "킹 베드 1개 + 싱글 소파베드 1개",
                size: 58,
                price: "₩180,000",
                originalPrice: "₩240,000",
                discount: "25% 할인",
                checkInTime: "15:00",
                checkOutTime: "11:00",
                amenities: [
                    "무료 WiFi",
                    "오션뷰",
                    "거실",
                    "주방",
                    "욕조 2개",
                    "TV 2대",
                    "발코니",
                ],
                availability: "available",
                cancellationPolicy: "체크인 5일 전까지 무료 취소 가능",
            },
        ],
        reviews: [
            {
                id: "rev1",
                author: "김영희",
                rating: 5,
                date: "2024-01-22",
                comment:
                    "위치가 정말 좋아요. 해변까지 걸어서 3분이면 갑니다. 시설도 깨끗하고 조식 맛있어요!",
                helpful: 32,
            },
            {
                id: "rev2",
                author: "이철수",
                rating: 4,
                date: "2024-01-19",
                comment:
                    "가족 여행으로 왔는데 키즈클럽이 있어서 아이들이 즐겁게 놀았습니다. 다만 주말이라 사람이 많았어요.",
                helpful: 21,
            },
        ],
        aiReviewSummary:
            "해운대 해변 바로 앞이라는 최고의 위치와 다양한 부대시설로 가족 단위 여행객들에게 매우 인기가 많습니다. 깨끗한 시설과 맛있는 조식이 특히 호평받고 있습니다.",
        policies: {
            cancellation: "체크인 3일 전까지 무료 취소 가능",
            children: "모든 연령의 아동 투숙 가능, 키즈클럽 이용 가능",
            pets: "반려동물 동반 불가",
            smoking: "전 객실 금연, 지정된 흡연 구역 이용",
        },
    },
};

export function useAccommodationDetail(id: string) {
    const [accommodation, setAccommodation] =
        useState<AccommodationDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAccommodation = async () => {
            setLoading(true);
            setError(null);

            try {
                // Try to fetch from API first
                const response = await fetch(`/api/accommodations/${id}`);
                
                if (response.ok) {
                    const apiData = await response.json();
                    const converted = convertToAccommodationDetail(apiData.data);
                    setAccommodation(converted);
                    return;
                }

                // Fallback to mock data if API fails
                const mockData = mockAccommodations[id];
                if (mockData) {
                    setAccommodation(mockData);
                } else {
                    setError("Accommodation not found");
                }
            } catch {
                // Fallback to mock data on error
                const mockData = mockAccommodations[id];
                if (mockData) {
                    setAccommodation(mockData);
                } else {
                    setError("Failed to load accommodation details");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAccommodation();
    }, [id]);

    return { accommodation, loading, error };
}
