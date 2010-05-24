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

if [ $# -lt 1 ]; then
  days=`sh ./days.sh`
else
  days=$1
fi

mkdir -p ../data

sh ./editor.sh ../data/$days.txt

sed -i 's/\s\+$//' ../data/$days.txt
while [ `sort ../data/* | uniq -d | wc -l` -ne 0 ]; do
  echo "Duplicated words detected:"
  sort ../data/* | uniq -d
  echo "Press enter to continue..."
  read nil
  sh ./editor.sh ../data/$days.txt
  sed -i 's/\s\+$//' ../data/$days.txt
done
