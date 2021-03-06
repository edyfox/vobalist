#!/bin/sh
#
# Copyright 2010 Edward Leap Fox (edyfox@gmail.com).
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

case "`uname`" in
  FreeBSD )
    epochday=`date -j 200001010000 +%s`
    today=`date +%s`
    ;;
  Darwin )
    epochday=`date -j 010100002000 +%s`
    today=`date +%s`
    ;;
  Linux | CYGWIN* | Windows* )
    epochday=`date -d 2000-01-01 +%s`
    today=`date +%s`
    ;;
esac

expr '(' $today - $epochday ')' / 86400
