#!/bin/bash

RNOrderFood_INFO=“RNOrderFood/Info.plist"

CERTIFICATE="iPhone Distribution: Chengdu Pinguo Technology Co., Ltd."

echo '修改 Bundle Identifier'
/usr/libexec/PlistBuddy -c "Set :CFBundleIdentifier com.pinguo.orderfood” $RNOrderFood_INFO

echo '打包'
xcodebuild -workspace RNOrderFood.xcworkspace -scheme RNOrderFood -configuration Release -sdk iphoneos clean build CODE_SIGN_IDENTITY="$CERTIFICATE" PROVISIONING_PROFILE="" GCC_PREPROCESSOR_DEFINITIONS='$(inherited) INHOUSE=1'
if [ $? != 0 ]
then
    exit $?
fi

xcrun -sdk iphoneos PackageApplication -v $1 -o $2
if [ $? != 0 ]
then
    exit $?
fi
echo '恢复 Bundle Identifier'
/usr/libexec/PlistBuddy -c "Set :CFBundleIdentifier com.pinguo.orderfood” $RNOrderFood_INFO