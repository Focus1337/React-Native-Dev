import {observer} from "mobx-react";
import {FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {useRootStore} from "../../hooks/useRootStore";
import CustomButton from "../../components/CustomButton";
import {LogsScreenProps} from "../../utils/types";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";

export const LogsScreen = observer(
    ({navigation}: LogsScreenProps) => {
        const {logsStore} = useRootStore();
        const {t} = useTranslation();

        useEffect(() => {
            (async () => await logsStore.actionHandleUpdateLogs())();
        }, []);

        return (
            <SafeAreaView style={styles.container}>
                <View style={{flex: 1}}>
                    <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>{t('logs.header')}</Text>
                    <FlatList
                        data={logsStore.logs}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({item}) => <LogItem logItem={item}/>}
                    />
                </View>
                <View>
                    <CustomButton onPress={async () => await logsStore.actionHandleRemoveLogs()} title={t('logs.remove-logs-button-text')}/>
                    <CustomButton onPress={() => navigation.goBack()} title={t('logs.back-button-text')}/>
                </View>
            </SafeAreaView>
        );
    }
);

const LogItem = ({logItem}: { logItem: string }) => {
    return (
        <View style={styles.logItem}>
            <Text>{logItem}</Text>
        </View>
    );
};

let styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 30,
        backgroundColor: 'white'
    },
    logItem: {
        padding: 6,
    },

});
