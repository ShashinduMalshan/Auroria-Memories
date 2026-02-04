import { View, Text ,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
  Animated,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
  FlatList, } from 'react-native'
import React ,{ useState ,useEffect ,useRef}from 'react'
import { authenticateBiometric } from '../../service/biometricService';

useEffect(() => {
  const lock = async () => {
    const success = await authenticateBiometric();
    if (!success) {
      alert("Authentication failed");
    }
  };

  lock();
}, []);// app/(dashboard)/home.tsx
// COMPLETE DASHBOARD WITH DUMMY DATA AND CLEAR COMMENTS
import { LinearGradient } from 'expo-linear-gradient';

const DashboardScreen = () => {
    const [userName] = useState('Shasidu');
    
    // Mock data for demonstration
    const reflectionCards = [
        {
            id: 1,
            text: "Write one thing you're grateful for today",
            emoji: "✨"
        },
        {
            id: 2,
            text: "You smiled on this day last year 😊",
            emoji: "💛"
        },
        {
            id: 3,
            text: "Pause. Breathe. Remember.",
            emoji: "🌸"
        }
    ];

    const statistics = [
        {
            id: 1,
            label: 'Total Memories',
            value: '247',
            icon: '📝',
            color: 'bg-purple-50'
        },
        {
            id: 2,
            label: 'With Photos',
            value: '89',
            icon: '📷',
            color: 'bg-blue-50'
        },
        {
            id: 3,
            label: 'This Month',
            value: '18',
            icon: '🗓️',
            color: 'bg-pink-50'
        }
    ];

    const recentMemories = [
        {
            id: 1,
            title: 'A peaceful morning walk',
            preview: 'The sunrise was breathtaking today. I felt grateful for...',
            date: 'Today, 8:30 AM',
            hasImage: true,
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
        },
        {
            id: 2,
            title: 'Coffee with an old friend',
            preview: 'We talked for hours about everything and nothing...',
            date: 'Yesterday, 3:15 PM',
            hasImage: false
        },
        {
            id: 3,
            title: 'Finished reading a beautiful book',
            preview: 'The ending made me cry. Sometimes stories touch our...',
            date: '2 days ago',
            hasImage: true,
            image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400'
        },
        {
            id: 4,
            title: 'Mom called today',
            preview: 'Her voice always makes me feel at home, no matter...',
            date: '3 days ago',
            hasImage: false
        }
    ];

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return { text: 'Good Morning', emoji: '☀️' };
        if (hour < 18) return { text: 'Good Afternoon', emoji: '🌤️' };
        return { text: 'Good Evening', emoji: '🌙' };
    };

    const greeting = getGreeting();

    return (
        <View className="flex-1 bg-gray-50">
            <ScrollView 
                className="flex-1"
                showsVerticalScrollIndicator={false}
            >
                {/* Header with Gradient */}
                <LinearGradient
                    colors={['#F0F4FF', '#F9FAFB']}
                    className="pt-14 pb-6 px-6 rounded-b-3xl"
                >
                    <Text className="text-3xl font-semibold text-gray-800 mb-1">
                        {greeting.text}, {userName} {greeting.emoji}
                    </Text>
                    <Text className="text-base text-gray-500 mt-1">
                        How are you feeling today?
                    </Text>
                </LinearGradient>

                {/* Reflection Slider */}
                <View className="mt-6 mb-4">
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        className="px-6"
                        contentContainerStyle={{ paddingRight: 24 }}
                    >
                        {reflectionCards.map((card, index) => (
                            <Pressable 
                                key={card.id}
                                className="mr-4 active:opacity-80"
                                style={{ width: 280 }}
                            >
                                <LinearGradient
                                    colors={['#FFFFFF', '#F9FAFB']}
                                    className="rounded-3xl p-6"
                                    style={{
                                        shadowColor: '#8B9FD9',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.08,
                                        shadowRadius: 16,
                                        elevation: 4
                                    }}
                                >
                                    <View className="flex-row items-start">
                                        <Text className="text-3xl mr-3">{card.emoji}</Text>
                                        <Text className="text-base text-gray-700 flex-1 leading-6">
                                            {card.text}
                                        </Text>
                                    </View>
                                </LinearGradient>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>

                {/* Statistics Cards */}
                <View className="px-6 mt-4">
                    <Text className="text-lg font-semibold text-gray-800 mb-4">
                        Your Journey
                    </Text>
                    <View className="flex-row justify-between">
                        {statistics.map((stat) => (
                            <View
                                key={stat.id}
                                className={`${stat.color} rounded-2xl p-4 flex-1 mx-1`}
                                style={{
                                    shadowColor: '#8B9FD9',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.06,
                                    shadowRadius: 8,
                                    elevation: 2
                                }}
                            >
                                <Text className="text-2xl mb-2">{stat.icon}</Text>
                                <Text className="text-2xl font-bold text-gray-800 mb-1">
                                    {stat.value}
                                </Text>
                                <Text className="text-xs text-gray-600">
                                    {stat.label}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Recent Memories */}
                <View className="px-6 mt-8 pb-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-semibold text-gray-800">
                            Recent Memories
                        </Text>
                        <TouchableOpacity>
                            <Text className="text-purple-600 text-sm font-medium">
                                See all
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {recentMemories.map((memory) => (
                        <Pressable
                            key={memory.id}
                            className="bg-white rounded-3xl p-5 mb-4 active:opacity-90"
                            style={{
                                shadowColor: '#8B9FD9',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.08,
                                shadowRadius: 12,
                                elevation: 3
                            }}
                        >
                            <View className="flex-row">
                                {/* Content */}
                                <View className="flex-1 pr-3">
                                    <Text className="text-base font-semibold text-gray-800 mb-2">
                                        {memory.title}
                                    </Text>
                                    <Text 
                                        className="text-sm text-gray-600 leading-5 mb-3"
                                        numberOfLines={2}
                                    >
                                        {memory.preview}
                                    </Text>
                                    <Text className="text-xs text-gray-400">
                                        {memory.date}
                                    </Text>
                                </View>

                                {/* Image Thumbnail */}
                                {memory.hasImage && (
                                    <View 
                                        className="bg-gray-200 rounded-2xl overflow-hidden"
                                        style={{ width: 80, height: 80 }}
                                    >
                                        <Image
                                            source={{ uri: memory.image }}
                                            style={{ width: '100%', height: '100%' }}
                                            resizeMode="cover"
                                        />
                                    </View>
                                )}
                            </View>
                        </Pressable>
                    ))}
                </View>

                {/* Floating Action Button Area */}
                <View className="h-24" />
            </ScrollView>
        </View>
    );
};

export default DashboardScreen;