song = "";

function preload()
{
    song = loadsound("music.mp3");
}

scoreLeftWrist = 0;
scoreRightWrist = 0;

leftWristX= 0;
leftWristY= 0;

rightWristX= 0;
rightWristY= 0;

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet model is Initialised");
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("ScoreRightWrist =" + scoreRightWrist + "ScoreLeftWrist =" + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX =" + rightWristX + "RightWristY =" + rightWristY);

        leftWristXWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX =" + leftWristX + "LeftWristY =" + leftWristY);
        }
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill("#00FFFF");
    stroke("#00FFFF");

    if(scoreRightWrist > 0.2)
    { 
      circle(rightWristX, rightWristY,20);
      
      if(rightWristY>0 && rightWristX <= 100)
      {
        document.getElementById("speed").innerHTML = "Speed = 0.5x ";
        song.rate(0.5);
      }

      else if(rightWristY>100 && rightWristX <= 200)
      {
        document.getElementById("speed").innerHTML = "Speed = 1x ";
        song.rate(1);
      }

      else if(rightWristY>200 && rightWristX <= 300)
      {
        document.getElementById("speed").innerHTML = "Speed = 1.5x ";
        song.rate(1.5);
      }

      else if(rightWristY>300 && rightWristX <= 400)
      {
        document.getElementById("speed").innerHTML = "Speed = 2x ";
        song.rate(2);
      }

      else if(rightWristY>400)
      {
        document.getElementById("speed").innerHTML = "Speed = 2.5x ";
        song.rate(2.5);
      }

   }

   if(scoreLeftWrist > 0.2)
   {
    circle(leftWristX, leftWristY, 20);
    InNumberLeftWristY = Number(leftWristY);
    remove_decimal = floor(InNumberLeftWristY);
    volume = remove_decimal/500;
    document.getElementById("volume").innerHTML = "Volume =" + volume;
    song.setVolume(volume);
   }
}
