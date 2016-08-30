#!/bin/bash




export LANG=en_US.UTF-8
export LANGUAGE=en_US.UTF-8
export LC_ALL=en_US.UTF-8

source $HOME/pg_tools/profile

OUTPUT_FOLDER=$1
IPA_NAME=$2

#修改工具链上App图标
flagIcon=./RNOrderFood/flag.png
iconvert $flagIcon

#清空输出目录
if [ -d "$OUTPUT_FOLDER" ]; then
	echo "清空输出目录"
	rm -rf $OUTPUT_FOLDER
fi

#编译打包
pkg -output $OUTPUT_FOLDER
pkg -env toolchain_distribution.cfg
pkg -make Debug 

#查看输出
IPA=$(find $OUTPUT_FOLDER -name "*.ipa")
if [[ $? -ne 0 ]]; then
	echo "ipa不存在"
	exit 100
fi

dSYM=$(find $OUTPUT_FOLDER -name "*.dSYM")
if [[ $? -ne 0 ]]; then
	echo "dSYM不存在"
	exit 101
fi

#修改文件名
echo "===========要修改的文件名:$IPA_NAME,参数:$2"
if [[ -z "$IPA_NAME" ]]; then
    echo "不需要修改文件名"
else
	echo "修改文件名"
	mv -f "$IPA" "$OUTPUT_FOLDER/$IPA_NAME.ipa"
	ret=$?
	echo "修改IPA文件名结果:$ret"
	if [[ $ret -ne 0 ]]; then
		echo "修改IPA文件名出错:102"
		exit 102
	fi
	mv -f "$dSYM" "$OUTPUT_FOLDER/$IPA_NAME.dSYM"
	ret=$?
	echo "修改dSYM文件名结果:$ret"
	if [[ $ret -ne 0 ]]; then
		echo "修改dSYM文件名出错:103"
		exit 103
	fi
fi

exit 0

