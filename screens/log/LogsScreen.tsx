import {observer} from "mobx-react";
import {FlatList, SafeAreaView, Text, View} from "react-native";
import {useRootStore} from "../../hooks/useRootStore";
import CustomButton from "../../components/CustomButton";
import {LogsScreenProps} from "../../utils/types";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useTheme} from "../../hooks/useTheme";
import {useStyles} from "../../hooks/useStyles";

export const LogsScreen = observer(
    ({navigation}: LogsScreenProps) => {
        const {logsStore} = useRootStore();
        const {t} = useTranslation();
        const {Colors} = useTheme();
        const styles = useStyles(Colors);

        useEffect(() => {
            (async () => await logsStore.actionHandleUpdateLogs())();
        }, []);

        return (
            <SafeAreaView style={styles.container}>
                <View style={{flex: 1}}>
                    <Text style={styles.screenHeader}>{t('logs.header')}</Text>
                    <FlatList
                        data={logsStore.logs}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({item}) => <LogItem logItem={item} textColor={styles.primaryText}/>}
                    />
                </View>
                <View>
                    <CustomButton onPress={async () => await logsStore.actionHandleRemoveLogs()}
                                  title={t('logs.remove-logs-button-text')}/>
                    <CustomButton onPress={() => navigation.goBack()} title={t('logs.back-button-text')}/>
                </View>
            </SafeAreaView>
        );
    }
);

const LogItem = ({logItem, textColor}: { logItem: string, textColor: { color: string } }) => {
    return (
        <View style={{padding: 6}}>
            <Text style={textColor}>{logItem}</Text>
        </View>
    );
};