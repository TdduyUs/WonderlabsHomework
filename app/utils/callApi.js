
import { Alert } from 'react-native';


function callApi(url, requestOptions) {
    var status = null
    return fetch(url, requestOptions)
        .then(request => {
            if (request.status === 500) {
                return 
            }
            if (request.status === 401) {
                status = 401
                return request.status
            }
            if (request.status === 400) {
                status = 400
            }
            return request.json()
        })
        .then(requestJson => {
            if(requestJson === undefined && status != 401) return  alertError("Error", "Server error!.")
            if (!!requestJson && !!requestJson.message_en){
                alertError("Error", `${requestJson.message_en}`)
                if(status===400) return status
                return 
            }
            if (!!requestJson) {
                return requestJson
            }
        })
        .catch(er => { return alertError("Error", "Network fail") });

}

const alertError = (title, msg) => {
    return (
        Alert.alert(
            `${title}`,
            `${msg}`,
            [
                {
                    text: 'OK', onPress: () => {
                        return
                    }
                },
            ]
        )
    )

}

export default callApi