/*
  Copyright 2010 Edward Leap Fox (edyfox@gmail.com).

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.RenderingHints;
import java.awt.font.FontRenderContext;
import java.awt.font.TextLayout;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;

public class Render {
  public static void main(String[] args) {
    String s = args[0];

    BufferedImage image = new BufferedImage(500, 500, BufferedImage.TYPE_INT_ARGB);
    Graphics2D g2 = image.createGraphics();
    g2.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING,
        RenderingHints.VALUE_TEXT_ANTIALIAS_ON);

    FontRenderContext frc = g2.getFontRenderContext();
    Font font = new Font("DejaVu Sans Mono", Font.PLAIN, 16);
    TextLayout tl = new TextLayout(s, font, frc);
    Rectangle rect = tl.getPixelBounds(frc, 100, 100);
    g2.setColor(Color.BLACK);
    tl.draw(g2, 100, 100);

    int height = (int) (tl.getAscent() + tl.getDescent());
    BufferedImage text = image.getSubimage((int) rect.getX(), (int) (100 - tl.getAscent()),
       (int) tl.getAdvance(), height);

    File file = new File("char" + Integer.toHexString((int) s.charAt(0)) + ".png");
    try {
      ImageIO.write(text, "png", file);
    } catch (IOException e) {
    }
  }
}
