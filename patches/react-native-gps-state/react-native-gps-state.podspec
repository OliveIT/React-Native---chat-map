Pod::Spec.new do |s|
  s.name         = "react-native-gps-state"
  s.version      = "1.0.0"
  s.summary      = "React Native Listener for GPS status changes"
  s.description  = <<-DESC
                  React Native Listener for GPS status changes
                   DESC
  s.homepage     = "https://github.com/neuberoliveira/react-native-gps-state.git"
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/neuberoliveira/react-native-gps-state.git", :tag => "master" }
  s.source_files  = "ios/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end
