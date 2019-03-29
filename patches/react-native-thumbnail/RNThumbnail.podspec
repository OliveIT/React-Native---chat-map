Pod::Spec.new do |s|
  s.name         = "RNThumbnail"
  s.version      = "1.1.0"
  s.summary      = "RNThumbnail"
  s.description  = <<-DESC
                  RNThumbnail
                   DESC
  s.homepage     = ""
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.homepage     = "https://github.com/phuochau/react-native-thumbnail"
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/phuochau/react-native-thumbnail.git", :tag => "master" }
  s.source_files  = "ios/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end


