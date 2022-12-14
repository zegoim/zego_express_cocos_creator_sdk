# Changelog

<a name="3.1.1"></a>
## 3.1.1 (2023-01-03)

### Added

- ✨ Add cocos framework identifier [004277c]
- ✨ Add declaration of the traffic control property enum [ac5a002]
- ✨ Add performance monitor [5ea388a]
- ✨ Add constructor for ZegoCanvas entity [0d6bb75]
- ✨ Implement preprocess module [8233e3a]
- ✨ Add preprocess module API declaration [65761d0]
- ✨ Implement device module [51e46bc]
- ✨ Add missing enum and entity declaration for device module [405ae68]
- ✨ Add device module API declaration [4231005]
- ✨ Implement more player module apis [4726a95]
- ✨ Implement more publisher module apis [a86d672]
- ✨ Add missing enum declaration [c356dd1]
- ✨ Add more basic callback declaration [1c8c0eb]
- ✨ Add some basic API declaration [a495d40]
- ✨ Add some entities and enums declaration [9fe4599]
- ✨ Add error code declaration [be659b6]
- ✨ Add basic API declaration, and refactor the structure [23b2bc5]
- ✨ Implement the texture renderer [16ea593]
- ✨ Add plugin base cmake config [681e526]
- 🎉 Initial commit, add necessary project configuration files [5e0651b]

### Changed

- ⬆️ Upgrade native library [8bc08e7]
- 📌 Update cc plugin json version number [66560a3]
- ⬆️ Upgrade native library [f0d7614]
- 🚨 Fix some clang-tidy warnings [a7e5ce2]
- 🎨 Improve code readability [6e7f4b1]
- 🎨 Format source code [09bfdda]
- 🎨 Improve project structure [6b4cac2]
- ♻️ Refactor the texture renderer controller, process the frame buffer instead of directly copy [fae6eb2]
- ♻️ Refactor the native bridge, move the relevant code into separate file [3501665]
- 🎨 Format source code [dd253db]
- 🚚 Rename the extension [f24d305]
- 🚚 Rename the native plugin [d4d6009]
- 🔧 Add extension configuration files [c76cb85]
- 🚚 Adjust the project folder structure [1d90212]
- 🔧 Add package.json for versioning and development tools [2197967]
- 🔧 Add husky configs [7056c14]
- 🚚 Adjust the project folder structure [e6cca0c]
- 🔧 Add commitlint config [a57ba9d]

### Fixed

- 🐛 Fix the issue that the cmake variable &quot;IOS_VARIANT&quot; can not be overwritten [50a4920]
- 🐛 Make sure prettier is running in the project root [6871b95]
- 🐛 Make sure prettier is running in the project root [3bf1a9e]
- 🐛 Fix the issue that the build script cannot run on windows [6c9ca89]
- 🐛 Fix the issue that the RTC SDK dll is missing on windows [3e3d97a]
- 🐛 Add missing function register [110b4a7]
- 🐛 Fix crash when reset the api called callback [234761a]
- 🐛 Fix crash when stopping render [6daa00f]
- 🐛 Fix compiler error on desktop platform, some APIs are only available on mobile [b59b86f]
- 🐛 Fix the issue that the api called callback not work [2f1c24b]
- 🐛 Fix property nullable declaration and document of the cdn config entity [254bfc0]
- 🐛 Fix type script warning of mismatched type [05b7ae2]
- 🐛 Fix compile error on android [e4738d1]
- 🐛 Mark some key callbacks to required to fix type script syntax tips issue [e446de6]
- 🐛 Fix the wrong RGBA pixel order on android [e8d06e3]
- 🐛 Fix android crash due to the redefined EGL symbols by cocos engine [c10f282]
- 🐛 Fix the issue that js &quot;this&quot; object is undefined in callback [67cd646]
- 🐛 Fix compile error when build for android [a260900]
- 🐛 Fix import path error [1096b92]
- 🐛 Fix build issue [0d1c272]
- 🐛 Fix the start publishing stream API [97f89e1]
- 🐛 Fix the issue that the plugins dir can not be made [79ad987]
- 🐛 Fix some API import issues [7c96024]
- 🐛 Fix iOS native header search path [fe2c5c2]
- 🐛 Fix the native cmake config, collect all source files [932459f]
- 🐛 Fix a crash on android , set missing application context [e052349]
- 🐛 Fix linker error of the wrong plugin name [c5ecaa5]

### Miscellaneous

- 🔨 Fix the development script, run npx without asking yes [2bf0ffe]
- 📝 Update API documents [989e6ed]
- 📝 Update API documents [ed7027f]
- 🔨 Generate changelog when running build script [c261e79]
- 📝 Add changelog generated by &quot;npx gitmoji-changelog&quot; [eb01003]
- 📝 Update README [3c0ff05]
- 🔨 Choose the largest build number&#x27;s native lib version as this package&#x27;s version [234d858]
- 🔨 Run npm install beforce build [124cf63]
- 🔨 Rename the cmake post hook config file [f3aa24b]
- 🔨 All nativbe libraries should be the same [major, minor] version [3305a1f]
- 🚧 Add constructor for some entity classes [e5d0aac]
- 🚧 Implement player module callbacks [ea00993]
- 🚧 Update declaration [bd6d2af]
- 🚧 Implement some basic callbacks [2cb5d93]
- 🚧 Move event handler to separate files [f9d6ae5]
- 🚧 Implement the callback of onRoomStreamUpdate [e38dab9]
- 🚧 Implement basic APIs [3f75181]
- 🚧 Implement some basic API [391ac23]
- 🚩 Try to use sebind::callFunction in event handler callback [4a8e6e7]
- 🚧 Optimize the texture renderer module [b5d4043]
- 🚧 Fix build issue [b7920c4]
- 🚧 Try to render video image to sprite frame [0ccebf3]
- 🚩 Add util function for dispatch jobs to cocos thread [e0e62dc]
- 🔨 Do not symlink plugin resources in development mode, there are some weird issues [6a2009b]
- 🔨 Copy native plugins to project folder to allow this extension to be installed in &quot;global&quot; or &quot;developer&quot; scope [fe16ed0]
- 👔 Implement the video render logic [1dcbd5b]
- 🔨 Update prettier config [c25d8d9]
- 🔨 Add prettier to format typescript source code [e92804a]
- 🔨 Add clang-format stage in the build script [8692d8a]
- 🚧 Add basic native implementation [73358c4]
- 🚧 Add basic APIs [9daf7c3]
- 🔨 Fix the extension install script [ad942b6]
- 🔨 Add build scripts for archiving and distribution [0d78de1]
- 🔨 Add script for this extension [f8084cd]
- 📄 Add license [397185f]


