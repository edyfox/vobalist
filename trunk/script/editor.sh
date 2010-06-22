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

try_editor() {
  "$@"
  ret="$?"
  if [ "$ret" -ne 126 ] && [ "$ret" -ne 127 ]; then
    exit "$ret"
  fi
}

if [ -n "$VISUAL" ]; then
  try_editor $VISUAL "$@"
fi

if [ -n "$EDITOR" ]; then
  try_editor $EDITOR "$@"
fi

if [ x`uname` = xWindowsNT ]; then
  try_editor cmd /c start /w notepad "$@"
else
  for editor in nano nano-tiny vi; do
    try_editor "$editor" "$@"
  done
fi
