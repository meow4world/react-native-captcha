/*
 * @Author: cc
 * @Date: 2021-02-24 15:27:42
 * @LastEditors: cc
 * @LastEditTime: 2021-03-09 17:40:25
 * @Description: X.X
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { 
  Pressable, 
  StyleSheet,
  SafeAreaView,
  Text,
  View, 
  TextInput,
} from 'react-native'
import { 
  init, 
  showCaptcha, 
  verifyCodeInitFinishListener,
  verifyCodeInitFailedListener,
  verifyCodeValidateFinishListener,
  verifyCodeCloseWindowListener,
  removeListener
} from 'react-native-captcha'

const App = () => {
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  
  useEffect(() => {
    init('your key')
    const listener1 = verifyCodeInitFinishListener(res => {
      console.log('verifyCodeInitFinishListener: ', res)
    })
    const listener2 = verifyCodeInitFailedListener(res => {
      console.log('verifyCodeInitFailedListener: ', res)
    })
    const listener3 = verifyCodeValidateFinishListener(res => {
      console.log('verifyCodeValidateFinishListener: ', res)
    })
    const listener4 = verifyCodeCloseWindowListener(res => {
      console.log('verifyCodeCloseWindowListener: ', res)
    })

    return () => removeListener(listener1, listener2, listener3, listener4)
    
  }, [])

  const canSubmit = useMemo(() => mobile && password, [mobile, password])

  const pressBtn = useCallback(() => {
    if (mobile && password) showCaptcha()
  }, [mobile, password])

  return <SafeAreaView style={styles.app}>
    <View style={styles.input}>
      <TextInput
        placeholderTextColor={'#ccc'}
        keyboardType="number-pad"
        value={mobile}
        onChangeText={e => setMobile(e)}
        placeholder="输入手机号码"
        style={styles.text_input}
      />
    </View>

    <View style={styles.input}>
      <TextInput
        placeholderTextColor={'#ccc'}
        value={password}
        onChangeText={e => setPassword(e)}
        placeholder="输入密码"
        style={styles.text_input}
      />
    </View>

    <Pressable onPress={pressBtn}>
      <View style={[styles.captcha_btn, !canSubmit && styles.captcha_btn_disable]}>
        <Text style={styles.captcha_text}>登录</Text>
      </View>
    </Pressable>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 20,
    marginTop: 20
  },
  text_input: {
    flex: 1,
    paddingBottom: 10,
    fontSize: 14,
  },
  captcha_btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    marginTop: 40,
    height: 44,
    borderRadius: 44,
    backgroundColor: '#236bfa',
  },
  captcha_btn_disable: {
    backgroundColor: '#8eaeef'
  },
  captcha_text: {
    fontSize: 14,
    color: '#fff'
  },
})

export default App
