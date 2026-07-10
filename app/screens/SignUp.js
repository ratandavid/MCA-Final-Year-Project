import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function SignUp(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSignUp = () => {
        const newErrors = {};

        if (!username) {
            newErrors.username = 'Username is required.';
        }

        if (!email) {
            newErrors.email = 'Email is required.';
        } else {
            const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailFormat.test(email)) {
                newErrors.email = 'Please enter a valid email address.';
            } else if (
                props.registeredUser &&
                props.registeredUser.email.toLowerCase() === email.toLowerCase()
            ) {
                newErrors.email = 'An account with this email already exists. Please log in instead.';
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
        props.onSignUpSuccess && props.onSignUpSuccess(username, email, pass);
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/applogo.png')} style={styles.logo} />

            <TextInput
                style={[styles.input, errors.username && styles.inputError]}
                onChangeText={(v) => { setUsername(v); setErrors((e) => ({ ...e, username: null })); }}
                value={username}
                placeholder="User Name"
            />
            {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

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
                    <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={22}
                        color="#888"
                    />
                </TouchableOpacity>
            </View>
            {errors.pass && <Text style={styles.errorText}>{errors.pass}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSignUp} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.loginRow}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={props.onNavigateToLogin}>
                    <Text style={styles.loginLink}>Login</Text>
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
    loginRow: {
        flexDirection: 'row',
        marginTop: 20,
    },
    loginText: {
        color: '#555',
    },
    loginLink: {
        color: '#6C63FF',
        fontWeight: '600',
    },
});

export default SignUp;
