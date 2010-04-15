#!/bin/sh
#
# Copyright 2010 Edward Leap Fox (edyfox@gmail.com).
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.
#

set -e

javac Render.java

for char in `cat ips.txt`; do
  java Render $char
done

cat<<EOF > ips.js
var imageMap = {};
(function(){
  preload = (function (filename) {
    imageMap[filename] = new Image();
    imageMap[filename].src = "image/" + filename + ".png";
  });
EOF

for file in *.png; do
  echo "  preload(\"`basename $file .png`\");" >> ips.js
done

cat<<EOF >> ips.js
})();
EOF

mv ips.js ../web/js/
mkdir -p ../web/image/
mv -f *.png ../web/image/
cp -f ../web/image/char27.png ../web/image/char2ca.png
cp -f ../web/image/char27.png ../web/image/char2cb.png
