import React from 'react';
import * as SecureStore from 'expo-secure-store';

const useSecureStore = () => {

    const tokenCache = {
        async getToken(key: string) {
            try {
                return SecureStore.getItemAsync(key);
            } catch (error) {
                return null;
            }
        },

        async saveToken(key: string, value: string) {
            try {
                return SecureStore.setItemAsync(key, value);
            } catch (error) {
                return;
            }
        },

        async removeToken(key: string) {
            try {
                SecureStore.deleteItemAsync(key);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return tokenCache;
};

export default useSecureStore;