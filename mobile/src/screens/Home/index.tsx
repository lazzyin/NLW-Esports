import { Image, View, FlatList } from 'react-native';
import { useEffect,useState } from 'react';
import { styles } from './styles';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Header';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Backgrounds';
import { useNavigation } from '@react-navigation/native';

export function Home() {

    const[games,setGames]=useState<GameCardProps[]>([])
    const navigation = useNavigation();

    function handleOpenGame({id, title, bannerUrl}:GameCardProps) {
        navigation.navigate=('game', {id, title, bannerUrl})
    }

    useEffect(()=>{
        fetch('http://192.168.56.1:3333/games').then(response=>response.json()).then(data=>setGames(data))
    },[])

    return (
        <Background>
        <SafeAreaView style={styles.container}>
            <Image source={logoImg} style={styles.logo} />
            
            <Heading title="Encontre seu duo" subtitle="Selecione o game que deseja jogar..." />

            <FlatList contentContainerStyle={styles.contentList} data={games} keyExtractor={item => item.id} renderItem={({item}) => (
                <GameCard data={ item} onPress={()=>handleOpenGame(item)}  />
            )} horizontal showsHorizontalScrollIndicator={false} />
            
        </SafeAreaView>
        </Background>
        
    );
}