import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useRoute,useNavigation } from '@react-navigation/native';
import { Background } from "../../components/Backgrounds";
import { styles } from "./styles";
import { GameParams } from "../../@types/navigation";
import * as icon from "@expo/vector-icons"
import logoImg from "../../assets/logo-nlw-esports.png"
import { THEME } from "../../theme";
import { Heading } from "../../components/Header";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { useEffect, useState } from "react";
import { DuoMatch } from "../../components/DuoMatch";

interface RouteParams{
    id: string;
    title: string;
    bannerUrl: string;
}

export function Game() {
    const navigation = useNavigation();
    const route = useRoute();
    const game = route.params as GameParams;
    const [duos, setDuos] = useState<DuoCardProps[]>([]);
    const [discordDuoSelected, setDiscordDuoSelected] = useState('');

    function handleGoBack() {
        navigation.goBack();
    }

    async function getDiscordUser(adsId:string) {
        fetch(`http://192.168.56.1:3333/ads/${adsId}/discord`).then(response=>response.json()).then(data=>setDiscordDuoSelected(data.discord))
    }

    useEffect(()=>{
        fetch(`http://192.168.56.1:3333/games/${game.id}/ads`).then(response=>response.json()).then(data=>setDuos(data))
    },[])

    return (
        <Background>
            <SafeAreaView style={styles.container}>
            
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <icon.Entypo name="chevron-thin-left" color={THEME.COLORS.CAPTION_300} size={20} />
                    </TouchableOpacity>
                    
                    <Image source={logoImg} style={styles.logo} />
                    
                    <View style={styles.right} />
                </View>
                    
                    <Heading title={game.title} subtitle="Conecte-se e comece a jogar!"/>
                    
                

                <Image source={{ uri: game.bannerUrl }} style={styles.cover} resizeMode="cover" />
                
                <FlatList
                    data={duos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <DuoCard data={item}
                            onConnect={()=>{}} />
                    )}
                    horizontal
                    style={styles.containerList}
                    contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>
                            Não há anuncios publicados para este game no momento
                        </Text>
                    )}
                />
                
                <DuoMatch visible={discordDuoSelected.length > 0} onClose={() => setDiscordDuoSelected('')} discord={discordDuoSelected} />
            </SafeAreaView>
        </Background>   
    )
};