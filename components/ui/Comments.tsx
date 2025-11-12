import { View, Text, Image } from 'react-native';

interface commentsProps {
    name?: string,
    good?: number,
    comment?: string,
    date?: string,
}

export default function Comments({ name = "익1", good = 0, comment = "야호", date = "0000-00-00" }: commentsProps) {
    comment = "배고파 졸려 피곤해";
    return (
        <View className="flex flex-col border border-gray-400 w-full max-w-[35vh] p-4">
            <View className="flex-row item-center justify-between">
                <Text>{name}</Text>
                <View className="flex-row gap-2">
                    <Image source={require("../../assets/icon/good.png")}/>
                    <Text>{good}</Text>
                </View>
            </View>                                                                            
            
            <Text className="text-gray-600 mt-2 text-xl">{comment}</Text>
            <Text className="text-gray-600 mt-5">{date}</Text>
        </View>
    );
}