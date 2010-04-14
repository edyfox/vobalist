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

if [ $# -lt 2 ]; then
  echo Usage: extract.sh engine word
  exit 1
fi

engine="$1"
word="$2"
dir=cache/`echo "$word" | md5sum | sed -n 's,^\(.\)\(.\).*,\1/\2,p'`
file="$dir/$word"

if [ ! -f "$file" ]; then
  mkdir -p $dir
  if [ -e "./extract-$engine.py" ]; then
    if python "./extract-$engine.py" "$word" > cache/tmp; then
      mv -f cache/tmp "$file"
      sleep 5
    else
      rm -f cache/tmp
      exit 1
    fi
  else
    echo "Engine \"$engine\" doesn't exist."
    exit 1
  fi
fi
cat "$file"
