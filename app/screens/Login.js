import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function Login(props) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleLogin = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = 'Email is required.';
        } else {
            const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailFormat.test(email)) {
                newErrors.email = 'Please enter a valid email address.';
            }
        }

        if (!pass) {
            newErrors.pass = 'Password is required.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        const registeredUser = props.registeredUser;
        if (registeredUser && registeredUser.email.toLowerCase() === email.toLowerCase()) {
            props.onLoginSuccess && props.onLoginSuccess(registeredUser.username);
            return;
        }
        setErrors({ general: 'No account found with this email.' });
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/applogo.png')} style={styles.logo} />

            <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                onChangeText={(v) => { setEmail(v); setErrors((e) => ({ ...e, email: null })); }}
                value={email}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <View style={[styles.passwordWrapper, errors.pass && styles.inputError]}>
                <TextInput
                    style={styles.passwordInput}
                    onChangeText={(v) => { setPass(v); setErrors((e) => ({ ...e, pass: null })); }}
                    value={pass}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#888" />
                </TouchableOpacity>
            </View>
            {errors.pass && <Text style={styles.errorText}>{errors.pass}</Text>}

            {errors.general && (
                <View style={styles.generalError}>
                    <Ionicons name="alert-circle-outline" size={15} color="#E25C5C" />
                    <Text style={styles.generalErrorText}>{errors.general}</Text>
                </View>
            )}

            <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.signUpRow}>
                <Text style={styles.signUpText}>Don't have an account? </Text>
                <TouchableOpacity onPress={props.onNavigateToSignUp}>
                    <Text style={styles.signUpLink}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        width: '100%',
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 4,
    },
    inputError: {
        borderColor: '#E25C5C',
    },
    errorText: {
        width: '100%',
        fontSize: 12,
        color: '#E25C5C',
        marginBottom: 12,
        marginTop: 2,
    },
    passwordWrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 4,
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 10,
    },
    generalError: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#FFF0F0',
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
    },
    generalErrorText: {
        fontSize: 13,
        color: '#E25C5C',
        flex: 1,
    },
    button: {
        width: '100%',
        backgroundColor: '#6C63FF',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
        shadowColor: '#6C63FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    signUpRow: {
        flexDirection: 'row',
        marginTop: 20,
    },
    signUpText: {
        color: '#555',
    },
    signUpLink: {
        color: '#6C63FF',
        fontWeight: '600',
    },
});

export default Login;
