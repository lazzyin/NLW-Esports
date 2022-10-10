import { View, Modal , ModalProps, Text,TouchableOpacity,Alert, ActivityIndicator} from 'react-native'
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { THEME } from '../../theme';
import * as Clipboard from 'expo-clipboard';
import { Heading } from '../Header';
import { useState } from 'react';


interface Props extends ModalProps{
    discord: string;
    onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
    const [isCopping, setIsCopping] = useState(false);

    async function handleCopyDiscordUserToClipboard() {
        setIsCopping(true);
        
        await Clipboard.setStringAsync(discord);
        
        Alert.alert('Discord copiado com sucesso', 'Usuario copiado para a area de transferencia')
        
        setIsCopping(false);
    }

    return (
        <Modal transparent statusBarTranslucent {...rest} animationType="fade">
        
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                        <MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_500}/>
                    </TouchableOpacity>

                    <Heading title="Let's Play!" subtitle="Agora é so começar a jogar!" style={{ alignItems: 'center', marginTop: 24 }} />
                    
                    <Text style={styles.label}>Adicione no discord </Text>

                    <TouchableOpacity style={styles.discordButton} onPress={handleCopyDiscordUserToClipboard} disabled={isCopping}>
                        <Text style={styles.discord}>{isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal>
    )
}