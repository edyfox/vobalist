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

set -e

if [ $# -lt 2 ]; then
  echo 'Usage: generate.sh engine day'
  exit 1
fi

engine="$1"
today="$2"

(
for day in 0 1 2 4 7 15 30 60 90 150 240; do
  num=`expr $today - $day`
  if [ -f ../data/$num.txt ]; then
    cat ../data/$num.txt
  fi
done
) | ./list.sh "$engine"
