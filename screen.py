import mss
import mss.tools


with mss.mss() as sct:
    # The screen part to capture
    monitor = {"top": 100, "left": 100, "width":100, "height": 100}
    output = "sct-{top}x{left}_{width}x{height}.png".format(**monitor)

    # Grab the data
    sct_img = sct.grab(monitor)
   
    # Save to the picture file
    mss.tools.to_png(sct_img.rgb, sct_img.size, output=output)
    print(output)
