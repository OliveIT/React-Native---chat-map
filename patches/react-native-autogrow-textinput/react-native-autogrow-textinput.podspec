Pod::Spec.new do |s|
  s.name         = "react-native-autogrow-textinput"
  s.version      = "5.1.1"
  s.summary      = "React Native auto-growing multiline text input"

  s.authors      = { "Wix" => "Wix" }
  s.homepage     = "https://github.com/wix/react-native-autogrow-textinput"
  s.license      = "MIT"
  s.platform     = :ios, "9.3"

  s.module_name  = 'ReactNativeNavigation'

  s.source       = { :git => "https://github.com/wix/react-native-autogrow-textinput.git", :tag => "v#{s.version}" }
  s.source_files  = "ios/**/*.{h,m}"
  s.header_mappings_dir = 'ios'
  s.public_header_files = "ios/*.h"

  s.dependency 'React'
end